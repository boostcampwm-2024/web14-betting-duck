import { useSocketIO } from "@/shared/hooks/useSocketIo";
import React from "react";

interface WaitingRoomContextType {
  socket: ReturnType<typeof useSocketIO>;
  isBettingStarted: boolean;
  setIsBettingStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

const WaitingRoomContext = React.createContext<WaitingRoomContextType>(null!);

function WaitingRoomProvider({ children }: { children: React.ReactNode }) {
  const [isBettingStarted, setIsBettingStarted] = React.useState(false);

  const socket = useSocketIO({
    url: "/api/betting",
    onConnect: () => {
      console.log("투표 대기 방에서 소켓 연결을 성공 했습니다.");
    },
    onDisconnect: (reason) => {
      console.error("투표 대기 방에서 소켓이 끊어졌습니다.");
      if (reason === "io server disconnect") {
        socket.reconnect();
      }
    },
    onError: (error) => {
      console.error("투표 대기 방에서 소켓 에러가 발생했습니다.");
      console.error(error);
    },
  });

  const value = React.useMemo(
    () => ({
      socket,
      isBettingStarted,
      setIsBettingStarted,
    }),
    [socket, isBettingStarted, setIsBettingStarted],
  );

  return (
    <WaitingRoomContext.Provider value={value}>
      {children}
    </WaitingRoomContext.Provider>
  );
}

export { WaitingRoomProvider, WaitingRoomContext };
