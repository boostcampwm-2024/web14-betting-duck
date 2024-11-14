import { Chat } from "@/pages/chat";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/chat")({
  component: Chat,
});
