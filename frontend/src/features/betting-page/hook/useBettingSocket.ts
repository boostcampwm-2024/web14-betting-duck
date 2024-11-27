import React from "react";
import { BettingPool } from "../utils/bettingOdds";
import { useBettingContext } from "./useBettingContext";
import { bettingRoomSchema } from "../model/schema";
import { useSocketIO } from "@/shared/hooks/useSocketIo";
import { responseBetRoomInfo } from "@betting-duck/shared";
import { z } from "zod";

type Options = "option1" | "option2";

type BettingRoomInfo = z.infer<typeof responseBetRoomInfo>;

function getSessionBettingPool(option: Options, bettingPool: BettingPool) {
  return typeof window !== "undefined"
    ? (JSON.parse(window.sessionStorage.getItem("betting_pool") || "{}")[
        option
      ] ?? bettingPool[option])
    : bettingPool[option];
}

function initialJoinRoom(
  socket: ReturnType<typeof useSocketIO>,
  bettingRoomInfo: BettingRoomInfo,
) {
  if (!socket.isConnected) return;
  socket.emit("fetchBetRoomInfo", {
    roomId: bettingRoomInfo.channel.id,
  });
}

function useBettingSocket() {
  const { socket, bettingRoomInfo, bettingPool, updateBettingPool } =
    useBettingContext();

  const prevOption1Ref = React.useRef<Partial<BettingPool["option1"]>>(
    getSessionBettingPool("option1", bettingPool),
  );
  const prevOption2Ref = React.useRef<Partial<BettingPool["option2"]>>(
    getSessionBettingPool("option2", bettingPool),
  );

  React.useEffect(() => {
    initialJoinRoom(socket, bettingRoomInfo);
  }, [socket, bettingRoomInfo]);

  React.useEffect(() => {
    if (!socket.isConnected) return;
    socket.emit("fetchBetRoomInfo", {
      roomId: bettingRoomInfo.channel.id,
    });
  }, [socket, bettingRoomInfo]);

  React.useEffect(() => {
    if (!socket.isConnected) return;

    socket.on("fetchBetRoomInfo", (data) => {
      const result = bettingRoomSchema.safeParse(data);
      if (!result.success) {
        console.error(result.error.errors);
        throw new Error("배팅 방 정보를 가져오는데 실패했습니다.");
      }

      const { channel } = result.data;
      if (
        prevOption1Ref.current.participants !== channel.option1.participants ||
        prevOption2Ref.current.participants !== channel.option2.participants
      ) {
        updateBettingPool({
          option1: {
            participants: channel.option1.participants,
            totalAmount: channel.option1.currentBets,
          },
          option2: {
            participants: channel.option2.participants,
            totalAmount: channel.option2.currentBets,
          },
        });
        prevOption1Ref.current = channel.option1;
        prevOption2Ref.current = channel.option2;
      }
    });

    return () => {
      socket.off("fetchBetRoomInfo");
    };
  }, [socket, updateBettingPool, bettingPool, bettingRoomInfo]);
}

export { useBettingSocket };
