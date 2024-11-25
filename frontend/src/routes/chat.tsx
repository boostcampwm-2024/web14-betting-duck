import { Chat } from "@/features/chat";
import { ChatError } from "@/features/chat/ui/ChatError";
import { ErrorComponent } from "@/shared/components/Error";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/chat")({
  loader: async () => {
    const response = await fetch("/api/users/token");
    if (!response.ok) {
      throw new Error("로그인이 필요합니다.");
    }
  },

  errorComponent: ({ error }) => (
    <ErrorComponent error={error} feature="채팅" to="/demo-login">
      <ChatError />
    </ErrorComponent>
  ),
  component: Chat,
});
