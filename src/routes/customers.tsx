import { createFileRoute } from "@tanstack/react-router";
import { MemoryDashboard } from "@/components/memory-dashboard";
export const Route = createFileRoute("/customers")({
  head: () => ({
    meta: [
      { title: "Customers | MemorySupport" },
      { name: "description", content: "Customer records and remembered support context." },
      { property: "og:title", content: "Customers | MemorySupport" },
      { property: "og:description", content: "Customer records and remembered support context." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MemoryDashboard page="Customers" />,
});
