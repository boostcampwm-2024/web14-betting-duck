import React from "react";
import { BettingPool } from "@/shared/utils/bettingOdds";
import { useBettingContext } from "./useBettingContext";
import { bettingRoomSchema } from "../model/schema";
import { useSocketIO } from "@/shared/hooks/useSocketIo";

type BettingContextType = ReturnType<typeof useBettingContext>;

interface BettingSocketDependencies {
  socket: ReturnType<typeof useSocketIO>;
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
    // 1. 이벤트 핸들러를 밖으로 분리
    const handleBetRoomInfo = async (data: unknown) => {
      console.log("fetchBetRoomInfo", data);
      const result = bettingRoomSchema.safeParse(data);
      if (!result.success) {
        console.error(result.error.errors);
        return; // throw 대신 early return 사용
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
    };

    // 2. 조건부 리스너 등록
    if (socket.isConnected && bettingRoomInfo.channel.status === "active") {
      socket.on("fetchBetRoomInfo", handleBetRoomInfo);

      // 3. 항상 cleanup 함수 반환
      return () => {
        socket.off("fetchBetRoomInfo");
      };
    }

    return () => {}; // 조건이 맞지 않을 때도 cleanup 함수 반환
  }, [
    socket,
    socket.isConnected,
    bettingRoomInfo.channel.status,
    updateBettingPool,
  ]);
}

export { useBettingRoomInfo };
