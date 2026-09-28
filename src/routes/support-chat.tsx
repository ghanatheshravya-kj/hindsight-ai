import { createFileRoute } from "@tanstack/react-router";
import { MemoryDashboard } from "@/components/memory-dashboard";
export const Route = createFileRoute("/support-chat")({
  head: () => ({
    meta: [
      { title: "Support Chat | MemorySupport" },
      { name: "description", content: "Customer conversations with contextual Hindsight Memory." },
      { property: "og:title", content: "Support Chat | MemorySupport" },
      {
        property: "og:description",
        content: "Customer conversations with contextual Hindsight Memory.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MemoryDashboard page="Support Chat" />,
});
