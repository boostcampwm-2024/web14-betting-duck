import React from "react";
import { useChat } from "../../hook/useChat";
import { MessageList } from "./ui/MessageList";
import { messageResponseSchema } from "@betting-duck/shared";
import { useUserContext } from "@/shared/hooks/useUserContext";
import Message from "./ui/Message";

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
  const isJoinedRef = React.useRef(false);
  const { userInfo } = useUserContext();

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

  React.useEffect(() => {
    if (!isJoinedRef.current && socket.isConnected && userInfo.nickname) {
      socket.emit("sendMessage", {
        sender: {
          nickname: userInfo.nickname,
        },
        channel: {
          roomId: userInfo.roomId ?? "123",
        },
        message: `${userInfo.nickname}님이 입장하셨습니다.`,
      });

      isJoinedRef.current = true;
    }
  }, [socket, userInfo]);

  const renderMessage = React.useCallback(Message, []);

  return <MessageList>{messages.map(renderMessage)}</MessageList>;
}

export { ChatMessages };
