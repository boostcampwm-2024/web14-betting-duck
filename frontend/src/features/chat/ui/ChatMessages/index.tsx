import React from "react";
import { useChat } from "../../hook/use-chat";
import { MessageList } from "./ui/MessageList";
import { messageResponseSchema } from "@betting-duck/shared";

interface Message {
  message: string;
  sender: {
    nickname: string;
  };
}

function ChatMessages() {
  const { socket } = useChat();
  const [messages, setMessages] = React.useState<Message[]>([]);

  React.useEffect(() => {
    socket.on("message", (data) => {
      const message = messageResponseSchema.safeParse(data);
      if (!message.success) {
        console.error(message.error.errors);
        return;
      }
      setMessages((prev) => [...prev, message.data]);
    });

    return () => {
      socket.off("message");
    };
  }, [socket]);

  return (
    <MessageList>
      {messages.map(({ sender, message }, i) => (
        <div
          key={`message-${i}-${sender.nickname}`}
          className={`rounded-lg p-3 font-bold ${
            sender.nickname === "User A"
              ? "ml-auto max-w-[80%] rounded-r-lg rounded-t-lg bg-purple-100"
              : "mr-auto max-w-[80%] bg-blue-200"
          }`}
        >
          <div className="text-sm font-semibold">{sender.nickname}</div>
          <div>{message}</div>
        </div>
      ))}
    </MessageList>
  );
}

export { ChatMessages };
