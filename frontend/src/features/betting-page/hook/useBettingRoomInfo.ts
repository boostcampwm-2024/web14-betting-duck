import React from "react";
import { BettingPool } from "../utils/bettingOdds";
import { useBettingContext } from "./useBettingContext";
import { bettingRoomSchema } from "../model/schema";

type BettingContextType = ReturnType<typeof useBettingContext>;

interface BettingSocketDependencies {
  socket: BettingContextType["socket"];
  bettingRoomInfo: BettingContextType["bettingRoomInfo"];
  bettingPool: BettingContextType["bettingPool"];
  updateBettingPool: BettingContextType["updateBettingPool"];
}

function useBettingRoomInfo(dependencies: BettingSocketDependencies) {
  const { socket, bettingRoomInfo, bettingPool, updateBettingPool } =
    dependencies;

  const prevOption1Ref = React.useRef<Partial<BettingPool["option1"]>>(
    bettingPool.option1,
  );
  const prevOption2Ref = React.useRef<Partial<BettingPool["option2"]>>(
    bettingPool.option2,
  );

  React.useEffect(() => {
    if (!socket.isConnected || bettingRoomInfo.channel.status !== "active")
      return socket.off("fetchBetRoomInfo");

    socket.on("fetchBetRoomInfo", async (data) => {
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

export { useBettingRoomInfo };
