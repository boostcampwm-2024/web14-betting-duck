import { useSocketIO } from "@/shared/hooks/use-socket-io";
import React from "react";

interface ChatContextType {
  socket: ReturnType<typeof useSocketIO>;
}

const ChatContext = React.createContext<ChatContextType | null>(null);

function ChatProvider({ children }: { children: React.ReactNode }) {
  const socket = useSocketIO({
    url: "/api/chat",
    onConnect: () => {
      console.log("채팅 메세지 소켓에 연결이 되었습니다.");
    },
    onDisconnect: (reason) => {
      console.log("채팅 메세지 소켓 연결이 끊겼습니다.", reason);
    },
  });

  React.useEffect(() => {
    if (socket.isConnected) {
      socket.emit("joinRoom", {
        sender: {
          nickname: "nickname",
        },
        channel: {
          roomId: "123",
        },
        message: "123 방에 nickname 님이 입장하셨습니다.",
      });
    }

    return () => {
      if (!socket.isConnected) {
        socket.emit("leaveRoom", {
          roomId: "123",
        });
      }
    };
  }, [socket]);

  return (
    <ChatContext.Provider value={{ socket }}>{children}</ChatContext.Provider>
  );
}

export { ChatProvider, ChatContext };
