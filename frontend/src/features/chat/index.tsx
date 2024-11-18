import { ChatHeader } from "@/features/chat/ui/ChatHeader";
import { ChatInput } from "@/features/chat/ui/ChatInput";
import { ChatMessages } from "@/features/chat/ui/ChatMessages";

function Chat() {
  return (
    <div className="flex flex-col justify-end">
      <ChatHeader />
      <ChatMessages />
      <ChatInput />
    </div>
  );
}

export { Chat };
