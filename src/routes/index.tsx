import { createFileRoute } from "@tanstack/react-router";
import { JoyJoyTerminal } from "@/components/joyjoy/JoyJoyTerminal";

export const Route = createFileRoute("/")({
  component: () => <JoyJoyTerminal />,
});
