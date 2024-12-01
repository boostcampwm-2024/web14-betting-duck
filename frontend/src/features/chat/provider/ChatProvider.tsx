import { useSocketIO } from "@/shared/hooks/useSocketIo";
import { useLoaderData, useParams } from "@tanstack/react-router";
import React from "react";

interface ChatContextType {
  socket: ReturnType<typeof useSocketIO>;
}

const ChatContext = React.createContext<ChatContextType | null>(null);

function ChatProvider({ children }: { children: React.ReactNode }) {
  const { roomId } = useParams({
    from: "/betting_/$roomId/vote",
  });
  const { userInfo } = useLoaderData({
    from: "/betting_/$roomId/vote",
  });
  const joinRoomRef = React.useRef(false);
  const socket = useSocketIO({
    url: "/api/chat",
    onConnect: () => {
      console.log("채팅 메세지 소켓에 연결이 되었습니다.");
      joinChatRoom();
    },
    onDisconnect: (reason) => {
      console.log("채팅 메세지 소켓 연결이 끊겼습니다.", reason);
    },
  });

  const joinChatRoom = React.useCallback(() => {
    if (!joinRoomRef.current) {
      joinRoomRef.current = true;
      socket.emit("joinRoom", {
        sender: {
          nickname: userInfo.nickname,
        },
        channel: {
          roomId: roomId,
        },
        message: `${roomId} 방에 nickname 님이 입장하셨습니다.`,
      });
    }
  }, [joinRoomRef, socket, userInfo.nickname, roomId]);

  return (
    <ChatContext.Provider value={{ socket }}>{children}</ChatContext.Provider>
  );
}

export { ChatProvider, ChatContext };
