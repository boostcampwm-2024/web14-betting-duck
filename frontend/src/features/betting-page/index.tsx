import { BettingContainer } from "./ui/BettingContainer";
import { BettingTimer } from "@/shared/components/BettingTimer/BettingTimer";
import { BettingSharedLink } from "@/shared/components/BettingSharedLink/BettingSharedLink";
import { useLayoutShift } from "@/shared/hooks/useLayoutShift";
import { useSocketIO } from "@/shared/hooks/useSocketIo";
import React from "react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { usePreventLeave } from "@/shared/hooks/usePreventLeave";
import { useSuspenseQuery } from "@tanstack/react-query";
import { bettingRoomQueryKey } from "@/shared/lib/bettingRoomInfo";
import { getBettingRoomInfo } from "./api/getBettingRoomInfo";
import { BettingRoomInfoSchema } from "@/shared/types";

function BettingPage() {
  useLayoutShift();
  const { roomId } = useParams({
    from: "/betting_/$roomId/vote/voting",
  });

  const { data } = useSuspenseQuery({
    queryKey: bettingRoomQueryKey(roomId),
    queryFn: () => getBettingRoomInfo(roomId),
  });
  const parsedData = BettingRoomInfoSchema.safeParse(data);
  if (!parsedData.success) {
    throw new Error("방 정보를 불러오는데 실패했습니다.");
  }
  const { channel } = parsedData.data;

  const joinRoomRef = React.useRef(false);
  const fetchBetRoomInfoRef = React.useRef(false);
  const navigate = useNavigate();
  const socket = useSocketIO({
    url: "/api/betting",
    onConnect: () => {
      console.log("베팅 페이지에 소켓에 연결이 되었습니다.");
      handleSocketConnection();
    },
    onDisconnect: (reason) => {
      console.log("베팅 페이지에 소켓 연결이 끊겼습니다.", reason);
      joinRoomRef.current = false;
      fetchBetRoomInfoRef.current = false;
    },
    onError: (error) => {
      console.error("베팅 페이지에 소켓 에러가 발생했습니다.", error);
    },
  });

  usePreventLeave(
    true,
    "베팅 페이지에서 벗어나면 베팅이 취소됩니다. 정말로 나가시겠습니까?",
  );

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

    if (channel.status === "active" && !fetchBetRoomInfoRef.current) {
      console.log(33);
      fetchBetRoomInfoRef.current = true;
      socket.emit("fetchBetRoomInfo", {
        roomId: channel.id,
      });
    }
  }, [channel.id, channel.status, socket]);

  const handleFinished = React.useCallback(
    (data: unknown) => {
      console.log("베팅이 종료되었습니다", data);
      navigate({
        to: "/betting/$roomId/vote/resultDetail",
        params: { roomId: channel.id },
      });
    },
    [navigate, channel.id],
  );

  const handleCancelWaitingRoom = React.useCallback(
    (data: unknown) => {
      console.log("베팅이 취소되었습니다", data);
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
      <BettingTimer socket={socket} bettingRoomInfo={parsedData.data} />
      <BettingContainer socket={socket} bettingRoomInfo={parsedData.data} />
      <BettingSharedLink />
    </div>
  );
}

export { BettingPage };
