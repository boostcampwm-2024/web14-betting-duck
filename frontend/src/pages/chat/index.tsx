import { ChatHeader } from "@/widgets/chat/ChatHeader";
import { ChatInput } from "@/widgets/chat/ChatInput";
import { ChatMessages } from "@/widgets/chat/ChatMessages";

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
