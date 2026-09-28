import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { HindsightClient, HindsightError } from "@vectorize-io/hindsight-client";

const backendDir = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(backendDir, ".env") });

const PORT = Number.parseInt(process.env.PORT || "3001", 10);
const HINDSIGHT_API_URL = (process.env.HINDSIGHT_API_URL || "").trim();
const HINDSIGHT_API_KEY = (process.env.HINDSIGHT_API_KEY || "").trim();
const LLM_API_KEY = (process.env.LLM_API_KEY || "").trim();
const LLM_MODEL = "gpt-4o-mini";
const LLM_URL = "https://api.openai.com/v1/chat/completions";

function hindsightConfigured() {
  return Boolean(HINDSIGHT_API_URL);
}

function llmConfigured() {
  return Boolean(LLM_API_KEY);
}

function bankIdForCustomer(customerId) {
  const normalized = String(customerId)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return normalized ? `customer-${normalized}` : "";
}

function hindsightStatusCode(error) {
  return error instanceof HindsightError ? error.statusCode : undefined;
}

function getHindsightClient() {
  if (!hindsightConfigured()) {
    return null;
  }
  const options = { baseUrl: HINDSIGHT_API_URL.replace(/\/$/, "") };
  if (HINDSIGHT_API_KEY) {
    options.apiKey = HINDSIGHT_API_KEY;
  }
  return new HindsightClient(options);
}

function formatMemories(recallResponse) {
  const results = Array.isArray(recallResponse?.results) ? recallResponse.results : [];
  return results
    .map((item) => {
      const text = typeof item?.text === "string" ? item.text.trim() : "";
      if (!text) {
        return null;
      }
      return {
        text,
        type: typeof item?.type === "string" ? item.type : undefined,
      };
    })
    .filter(Boolean);
}

function memoriesAsPrompt(memories) {
  if (!memories.length) {
    return "No prior memories were recalled for this customer.";
  }
  return memories.map((memory, index) => `${index + 1}. ${memory.text}`).join("\n");
}

async function recallCustomerMemories(client, bankId, message) {
  try {
    return formatMemories(await client.recall(bankId, message, { budget: "mid" }));
  } catch (error) {
    // Lazy banks do not exist until the first retain. A missing bank is "no memories", not a chat failure.
    if (hindsightStatusCode(error) === 404) {
      return [];
    }
    throw error;
  }
}

async function generateSupportReply({ customerId, message, memories }) {
  const system = [
    "You are MemorySupport, an AI customer-support agent.",
    "Use recalled Hindsight memories when they are relevant.",
    "Do not invent past issues, environments, or solutions that are not in the recalled memories.",
    "If no memories were recalled, help with the current message and ask only for missing facts you actually need.",
    "Be concise, practical, and personalized when memory exists.",
  ].join(" ");

  const user = [
    `Customer ID: ${customerId}`,
    "",
    "Recalled memories from Hindsight:",
    memoriesAsPrompt(memories),
    "",
    "Current customer message:",
    message,
  ].join("\n");

  const response = await fetch(LLM_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LLM_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: LLM_MODEL,
      temperature: 0.3,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const detail = payload?.error?.message || response.statusText;
    throw new Error(`LLM request failed (${response.status}): ${detail}`);
  }

  const text = payload?.choices?.[0]?.message?.content;
  if (typeof text !== "string" || !text.trim()) {
    throw new Error("LLM returned an empty response.");
  }
  return text.trim();
}

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "memorysupport-backend",
    hindsightConfigured: hindsightConfigured(),
    llmConfigured: llmConfigured(),
    note: "Configured flags mean environment variables are present, not that Hindsight or the LLM have been verified live.",
  });
});

app.post("/api/chat", async (req, res) => {
  const customerId = typeof req.body?.customerId === "string" ? req.body.customerId.trim() : "";
  const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";

  if (!customerId || !message) {
    return res.status(400).json({
      error: "customerId and message are required.",
    });
  }

  const bankId = bankIdForCustomer(customerId);
  if (!bankId) {
    return res.status(400).json({
      error: "customerId must include letters or numbers.",
    });
  }

  if (!hindsightConfigured()) {
    return res.status(503).json({
      error:
        "Hindsight is not configured. Set HINDSIGHT_API_URL in backend/.env. Do not treat the UI mock data as Hindsight memory.",
    });
  }

  if (!llmConfigured()) {
    return res.status(503).json({
      error: "LLM is not configured. Set LLM_API_KEY in backend/.env.",
    });
  }

  const client = getHindsightClient();

  try {
    const memories = await recallCustomerMemories(client, bankId, message);
    const reply = await generateSupportReply({ customerId, message, memories });

    let retained = false;
    try {
      await client.retain(
        bankId,
        [
          `Support interaction for customer ${customerId}.`,
          `Customer said: ${message}`,
          `Agent replied: ${reply}`,
        ].join("\n"),
        {
          context: "MemorySupport customer support chat",
          metadata: {
            source: "memorysupport-backend",
            customerId,
          },
        },
      );
      retained = true;
    } catch (retainError) {
      console.error("Hindsight retain failed:", retainError);
    }

    return res.json({
      customerId,
      bankId,
      reply,
      memories,
      retained,
    });
  } catch (error) {
    console.error("POST /api/chat failed:", error);
    return res.status(502).json({
      error: error instanceof Error ? error.message : "Chat request failed.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`MemorySupport backend listening on http://localhost:${PORT}`);
  console.log(
    hindsightConfigured()
      ? "Hindsight URL is set; live recall/retain still depends on a reachable Hindsight API and valid credentials."
      : "Hindsight is not configured (HINDSIGHT_API_URL is empty).",
  );
  console.log(llmConfigured() ? "LLM_API_KEY is set." : "LLM is not configured (LLM_API_KEY is empty).");
});
