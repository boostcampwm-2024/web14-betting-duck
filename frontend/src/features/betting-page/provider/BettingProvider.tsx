import { useSocketIO } from "@/shared/hooks/use-socket-io";
import { useLoaderData } from "@tanstack/react-router";
import React from "react";
import { responseBetRoomInfo } from "@betting-duck/shared";
import { z } from "zod";

interface BettingContexttType {
  socket: ReturnType<typeof useSocketIO>;
  bettingRoomInfo: z.infer<typeof responseBetRoomInfo>;
}

function bettingRoomInfoTypeGuard(
  info: unknown,
): info is z.infer<typeof responseBetRoomInfo> {
  return responseBetRoomInfo.safeParse(info).success;
}

const BettingContext = React.createContext<BettingContexttType | null>(null);

function BettingProvider({ children }: { children: React.ReactNode }) {
  const socket = useSocketIO({
    url: "/api/chat",
    onConnect: () => {
      console.log("배팅 페이지에 소켓에 연결이 되었습니다.");
    },
    onDisconnect: (reason) => {
      console.log("배팅 페이지에 소켓 연결이 끊겼습니다.", reason);
    },
  });
  const { bettingRoomInfo } = useLoaderData({ from: "/betting_/$roomId/vote" });
  if (!bettingRoomInfoTypeGuard(bettingRoomInfo)) {
    throw new Error("배팅 방 정보를 가져오는데 실패했습니다.");
  }

  const value = React.useMemo(
    () => ({ socket, bettingRoomInfo }),
    [socket, bettingRoomInfo],
  );

  return (
    <BettingContext.Provider value={value}>{children}</BettingContext.Provider>
  );
}

export { BettingProvider, BettingContext };
