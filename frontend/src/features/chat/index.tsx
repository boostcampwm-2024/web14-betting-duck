import { ChatHeader } from "@/features/chat/ui/ChatHeader";
import { ChatInput } from "@/features/chat/ui/ChatInput";
import { ChatMessages } from "@/features/chat/ui/ChatMessages";
import { ChatProvider } from "./provider/ChatProvider";
import { cn } from "@/shared/misc";

function Chat() {
  return (
    <ChatProvider>
      <div
        className={cn(
          "chatting-container",
          "bg-layout-main relative flex flex-col justify-end pt-4",
        )}
      >
        <ChatHeader />
        <ChatMessages />
        <ChatInput />
      </div>
    </ChatProvider>
  );
}

export { Chat };
