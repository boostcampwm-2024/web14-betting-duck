import { BettingContainer } from "./ui/BettingContainer";
import { BettingTimer } from "@/shared/components/BettingTimer/BettingTimer";
import { BettingSharedLink } from "@/shared/components/BettingSharedLink/BettingSharedLink";
import { useLayoutShift } from "@/shared/hooks/useLayoutShift";
import { useSocketIO } from "@/shared/hooks/useSocketIo";
import React from "react";
import { useLoaderData, useNavigate } from "@tanstack/react-router";

function BettingPage() {
  useLayoutShift();
  const { bettingRoomInfo } = useLoaderData({
    from: "/betting_/$roomId/vote",
  });
  const { channel } = bettingRoomInfo;

  const joinRoomRef = React.useRef(false);
  const fetchBetRoomInfoRef = React.useRef(false);
  const navigate = useNavigate();
  const socket = useSocketIO({
    url: "/api/betting",
    onConnect: () => {
      console.log("배팅 페이지에 소켓에 연결이 되었습니다.");
      handleSocketConnection();
    },
    onDisconnect: (reason) => {
      console.log("배팅 페이지에 소켓 연결이 끊겼습니다.", reason);
      joinRoomRef.current = false;
      fetchBetRoomInfoRef.current = false;
    },
    onError: (error) => {
      console.error("배팅 페이지에 소켓 에러가 발생했습니다.", error);
    },
  });

  const handleSocketConnection = React.useCallback(() => {
    if (!joinRoomRef.current) {
      console.log(22);
      joinRoomRef.current = true;
      socket.emit("joinRoom", {
        channel: {
          roomId: channel.id,
        },
      });
    }

    if (
      bettingRoomInfo.channel.status === "active" &&
      !fetchBetRoomInfoRef.current
    ) {
      console.log(33);
      fetchBetRoomInfoRef.current = true;
      socket.emit("fetchBetRoomInfo", {
        roomId: channel.id,
      });
    }
  }, [channel.id, bettingRoomInfo.channel.status, socket]);

  const handleFinished = React.useCallback(
    (data: unknown) => {
      console.log("배팅이 종료되었습니다", data);
      navigate({
        to: `/betting/${bettingRoomInfo.channel.id}/vote/resultDetail`,
      });
    },
    [navigate, bettingRoomInfo.channel.id],
  );

  const handleCancelWaitingRoom = React.useCallback(
    (data: unknown) => {
      console.log("배팅이 취소되었습니다", data);
      navigate({
        to: "/my-page",
      });
    },
    [navigate],
  );

  React.useEffect(() => {
    socket.on("finished", handleFinished);
    socket.on("cancelWaitingRoom", handleCancelWaitingRoom);

    return () => {
      socket.off("finished");
      socket.off("cancelWaitingRoom");
    };
  }, [handleFinished, handleCancelWaitingRoom, socket]);

  return (
    <div className="flex w-[100cqw] flex-col">
      <BettingTimer socket={socket} />
      <BettingContainer socket={socket} />
      <BettingSharedLink />
    </div>
  );
}

export { BettingPage };
