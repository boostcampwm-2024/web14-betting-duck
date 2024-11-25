import { useSocketIO } from "@/shared/hooks/use-socket-io";
import { responseBetRoomInfo } from "@betting-duck/shared";
import { useLoaderData, useLocation, useRouter } from "@tanstack/react-router";
import React from "react";
import { z } from "zod";

interface WaitingRoomContextType {
  socket: ReturnType<typeof useSocketIO>;
  roomId: string;
  info: z.infer<typeof responseBetRoomInfo>;
  setInfo: React.Dispatch<
    React.SetStateAction<z.infer<typeof responseBetRoomInfo>>
  >;
  isBettingStarted: boolean;
  setIsBettingStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

const WaitingRoomContext = React.createContext<WaitingRoomContextType>(null!);

function WaitingRoomProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const router = useRouter();
  const { roomId, bettingRommInfo } = useLoaderData({
    from: "/betting_/$roomId/waiting",
  });
  const [info, setInfo] =
    React.useState<z.infer<typeof responseBetRoomInfo>>(bettingRommInfo);
  const [isBettingStarted, setIsBettingStarted] = React.useState(false);

  const socket = useSocketIO({
    url: "/api/betting",
    onConnect: () => {
      console.log("투표 대기 방에서 소켓 연결을 성공 했습니다.");
    },
    onDisconnect: (reason) => {
      console.error("투표 대기 방에서 소켓이 끊어졌습니다.");
      console.error(reason);
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
      info,
      setInfo,
      isBettingStarted,
      setIsBettingStarted,
    }),
    [socket, roomId, info, setInfo, isBettingStarted, setIsBettingStarted],
  );

  React.useEffect(() => {
    function handleVisibilityChange() {
      if (document.visibilityState === "hidden" && socket.isConnected) {
        socket.disconnect();
      }
    }

    const unsubscribeRouteChange = router.subscribe(
      "onBeforeNavigate",
      (navigation) => {
        const currentPath = location.pathname;
        const nextPath = navigation.toLocation.pathname;

        if (
          currentPath === navigation.fromLocation.pathname &&
          nextPath !== currentPath &&
          socket.isConnected
        ) {
          socket.disconnect();
        }
      },
    );

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      unsubscribeRouteChange();
    };
  }, [socket, router, location.pathname]);

  return (
    <WaitingRoomContext.Provider value={value}>
      {children}
    </WaitingRoomContext.Provider>
  );
}

export { WaitingRoomProvider, WaitingRoomContext };
