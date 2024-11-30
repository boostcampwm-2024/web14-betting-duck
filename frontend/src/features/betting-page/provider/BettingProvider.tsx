import { useSocketIO } from "@/shared/hooks/useSocketIo";
import React from "react";
import { responseBetRoomInfo } from "@betting-duck/shared";
import { z } from "zod";
import {
  type BettingPool,
  getBettingSummary,
} from "@/shared/utils/bettingOdds";
import { getBettingRoomInfo } from "../api/getBettingRoomInfo";
import { Route } from "@/routes/betting_.$roomId.vote";
import { useSessionStorage } from "@/shared/hooks/useSessionStorage";
import { STORAGE_KEY } from "../model/var";

interface BettingContextType {
  socket: ReturnType<typeof useSocketIO>;
  bettingRoomInfo: z.infer<typeof responseBetRoomInfo>;
  bettingPool: ContextBettingPool;
  bettingSummary: ReturnType<typeof getBettingSummary>;
  updateBettingPool: (partialPool: PartialBettingPool) => void;
  updateBettingRoomInfo: () => void;
}

type PartialBettingPool = Partial<{
  option1: Partial<BettingPool["option1"]>;
  option2: Partial<BettingPool["option2"]>;
  isPlaceBet: boolean;
  placeBetAmount: number;
  isBettingEnd: boolean;
}>;

interface ContextBettingPool extends BettingPool {
  isPlaceBet: boolean;
  placeBetAmount: number;
  isBettingEnd: boolean;
}

const BettingContext = React.createContext<BettingContextType | null>(null);

function bettingRoomInfoTypeGuard(
  info: unknown,
): info is z.infer<typeof responseBetRoomInfo> {
  return responseBetRoomInfo.safeParse(info).success;
}

function BettingProvider({ children }: { children: React.ReactNode }) {
  const { setSessionItem } = useSessionStorage();
  const { bettingRoomInfo } = Route.useLoaderData();
  if (!bettingRoomInfoTypeGuard(bettingRoomInfo)) {
    throw new Error("배팅 방 정보를 가져오는데 실패했습니다.");
  }
  const [currentBettingRoomInfo, setCurrentBettingRoomInfo] =
    React.useState(bettingRoomInfo);
  const [bettingPool, setBettingPool] = React.useState<ContextBettingPool>({
    option1: {
      totalAmount: 0,
      participants: 0,
    },
    option2: {
      totalAmount: 0,
      participants: 0,
    },
    isPlaceBet: false,
    placeBetAmount: 0,
    isBettingEnd: false,
  });

  const bettingSummary = React.useMemo(() => {
    return getBettingSummary(bettingPool);
  }, [bettingPool]);

  const socket = useSocketIO({
    url: "/api/betting",
    onConnect: () => {
      console.log("배팅 페이지에 소켓에 연결이 되었습니다.");
    },
    onDisconnect: (reason) => {
      console.log("배팅 페이지에 소켓 연결이 끊겼습니다.", reason);
    },
    onError: (error) => {
      console.error("배팅 페이지에 소켓 에러가 발생했습니다.", error);
    },
  });

  const updateBettingPool = React.useCallback(
    async (partialPool: PartialBettingPool) => {
      const newPool = {
        option1: {
          ...bettingPool.option1,
          ...(partialPool.option1 || {}),
        },
        option2: {
          ...bettingPool.option2,
          ...(partialPool.option2 || {}),
        },
        isPlaceBet: partialPool.isPlaceBet || false,
        placeBetAmount: partialPool.placeBetAmount || 0,
        isBettingEnd: partialPool.isBettingEnd || false,
      };
      try {
        await setSessionItem(STORAGE_KEY, JSON.stringify(newPool));
        setBettingPool(newPool);
      } catch (error) {
        console.error("배팅 풀을 업데이트하는데 실패했습니다.", error);
      }
    },
    [bettingPool, setSessionItem],
  );

  const updateBettingRoomInfo = React.useCallback(async () => {
    const updatedBettingRoomInfo = await getBettingRoomInfo(
      bettingRoomInfo.channel.id,
    );
    console.log(updatedBettingRoomInfo);
    if (
      !updatedBettingRoomInfo ||
      !bettingRoomInfoTypeGuard(updatedBettingRoomInfo)
    ) {
      console.error("새로운 방 정보를 가져오는데 실패했습니다.");
      return;
    }

    setCurrentBettingRoomInfo(updatedBettingRoomInfo);
  }, [bettingRoomInfo.channel.id]);

  const value = React.useMemo(
    () => ({
      socket,
      bettingRoomInfo: currentBettingRoomInfo,
      bettingPool,
      bettingSummary,
      updateBettingPool,
      updateBettingRoomInfo,
    }),
    [
      socket,
      currentBettingRoomInfo,
      bettingPool,
      bettingSummary,
      updateBettingPool,
      updateBettingRoomInfo,
    ],
  );

  return (
    <BettingContext.Provider value={value}>{children}</BettingContext.Provider>
  );
}

export { BettingProvider, BettingContext };
