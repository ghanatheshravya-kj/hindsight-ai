import { createFileRoute } from "@tanstack/react-router";
import { MemoryDashboard } from "@/components/memory-dashboard";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Overview | MemorySupport" },
      {
        name: "description",
        content:
          "Customer support overview with conversation insights and persistent customer memory.",
      },
      { property: "og:title", content: "MemorySupport — Overview" },
      { property: "og:description", content: "Customer support that remembers the full story." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MemoryDashboard page="Overview" />,
});
