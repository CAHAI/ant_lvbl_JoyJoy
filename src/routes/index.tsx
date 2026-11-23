import { createFileRoute } from "@tanstack/react-router";
import { JoyJoyTerminal } from "@/components/joyjoy/JoyJoyTerminal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Joy-Joy OS — Mandatory Mental Hygiene Terminal" },
      { name: "description", content: "Speak with your Joy-Joy Counselor. Happiness is a choice and a requirement." },
      { property: "og:title", content: "Joy-Joy OS — Mandatory Mental Hygiene Terminal" },
      { property: "og:description", content: "Speak with your Joy-Joy Counselor. Happiness is a choice and a requirement." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JoyJoyTerminal,
});
