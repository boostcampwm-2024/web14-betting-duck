import React from "react";
import { useChat } from "../../hook/use-chat";
import { MessageList } from "./ui/MessageList";
import { messageResponseSchema } from "@betting-duck/shared";

interface Message {
  message: string;
  color: string;
  radius: string;
  sender: {
    nickname: string;
  };
}

const randomColor = () => {
  const colors = [
    "text-pink-500",
    "text-purple-500",
    "text-blue-500",
    "text-orange-500",
    "text-red-500",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const randomRadius = () => {
  const radiuses = [
    "rounded-tl-lg rounded-bl-lg",
    "rounded-tl-lg rounded-bl-lg rounded-br-lg",
    "rounded-tl-lg rounded-bl-lg rounded-bl-lg",
    "rounded-tl-lg rounded-bl-lg rounded-bl-lg",
  ];
  return radiuses[Math.floor(Math.random() * radiuses.length)];
};

function ChatMessages() {
  const { socket } = useChat();
  const [messages, setMessages] = React.useState<Message[]>([]);

  React.useEffect(() => {
    socket.on("message", (data) => {
      const message = messageResponseSchema.safeParse(data);
      const color = randomColor();
      const radius = randomRadius();
      if (!message.success) {
        console.error(message.error.errors);
        return;
      }
      const newMessage = {
        message: message.data.message,
        sender: message.data.sender,
        color,
        radius,
      };
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off("message");
    };
  }, [socket]);

  const renderMessage = React.useCallback(
    ({ sender, message, color, radius }: Message, index: number) => (
      <div key={sender.nickname + index} className="flex justify-end">
        <div
          className={`max-w-[80%] ${radius} flex flex-row items-start gap-4 bg-white p-3 shadow-sm`}
        >
          <div>
            <span
              className={`${color} text-md mr-3 whitespace-nowrap font-bold`}
            >
              {sender.nickname}
            </span>
            <span className="break-words text-gray-700">{message}</span>
          </div>
        </div>
      </div>
    ),
    [],
  );

  return <MessageList>{messages.map(renderMessage)}</MessageList>;
}

export { ChatMessages };
