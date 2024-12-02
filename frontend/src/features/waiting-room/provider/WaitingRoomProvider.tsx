import { useSocketIO } from "@/shared/hooks/useSocketIo";
import { responseBetRoomInfo } from "@betting-duck/shared";
import { useLoaderData } from "@tanstack/react-router";
import React from "react";
import { z } from "zod";

interface WaitingRoomContextType {
  socket: ReturnType<typeof useSocketIO>;
  roomId: string;
  bettingRoomInfo: z.infer<typeof responseBetRoomInfo>;
  setBettingRoomInfo: React.Dispatch<
    React.SetStateAction<z.infer<typeof responseBetRoomInfo>>
  >;
  isBettingStarted: boolean;
  setIsBettingStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

const WaitingRoomContext = React.createContext<WaitingRoomContextType>(null!);

function WaitingRoomProvider({ children }: { children: React.ReactNode }) {
  const { roomId, bettingRoomInfo } = useLoaderData({
    from: "/betting_/$roomId/waiting",
  });
  const [currentBettingRoomInfo, setCurrentBettingRoomInfo] =
    React.useState(bettingRoomInfo);
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
      roomId,
      bettingRoomInfo: currentBettingRoomInfo,
      setBettingRoomInfo: setCurrentBettingRoomInfo,
      isBettingStarted,
      setIsBettingStarted,
    }),
    [
      socket,
      roomId,
      currentBettingRoomInfo,
      setCurrentBettingRoomInfo,
      isBettingStarted,
      setIsBettingStarted,
    ],
  );

  return (
    <WaitingRoomContext.Provider value={value}>
      {children}
    </WaitingRoomContext.Provider>
  );
}

export { WaitingRoomProvider, WaitingRoomContext };
