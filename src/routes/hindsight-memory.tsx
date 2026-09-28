import { createFileRoute } from "@tanstack/react-router";
import { MemoryDashboard } from "@/components/memory-dashboard";
export const Route = createFileRoute("/hindsight-memory")({
  head: () => ({
    meta: [
      { title: "Hindsight Memory | MemorySupport" },
      { name: "description", content: "Customer history, solutions and preferences in one place." },
      { property: "og:title", content: "Hindsight Memory | MemorySupport" },
      {
        property: "og:description",
        content: "Customer history, solutions and preferences in one place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MemoryDashboard page="Hindsight Memory" />,
});
