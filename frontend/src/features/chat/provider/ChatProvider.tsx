import { useSocketIO } from "@/shared/hooks/useSocketIo";
import { responseUserInfoSchema } from "@betting-duck/shared";
import { useParams } from "@tanstack/react-router";
import React from "react";
import { z } from "zod";

interface ChatContextType {
  socket: ReturnType<typeof useSocketIO>;
  userInfo: z.infer<typeof responseUserInfoSchema>;
}

const ChatContext = React.createContext<ChatContextType | null>(null);

function ChatProvider({ children }: { children: React.ReactNode }) {
  const { roomId } = useParams({
    from: "/betting_/$roomId/vote",
  });
  const [userInfo, setUerInfo] = React.useState<
    z.infer<typeof responseUserInfoSchema>
  >({
    message: "OK",
    nickname: "",
    role: "user",
    duck: 0,
    realDuck: 0,
  });

  React.useEffect(() => {
    (async () => {
      const userInfoResponse = await fetch("/api/users/userInfo");
      if (!userInfoResponse.ok) {
        throw new Error("사용자 정보를 불러오는데 실패했습니다.");
      }
      const data = await userInfoResponse.json();
      const userInfo = responseUserInfoSchema.safeParse(data);
      if (userInfo.success) {
        setUerInfo(userInfo.data);
      }
    })();
  }, []);

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
    <ChatContext.Provider value={{ socket, userInfo }}>
      {children}
    </ChatContext.Provider>
  );
}

export { ChatProvider, ChatContext };
