import React from "react";
import { type BettingPool } from "@/shared/utils/bettingOdds";
import { useSessionStorage } from "@/shared/hooks/useSessionStorage";
import { STORAGE_KEY } from "../model/var";

// 기본 베팅 풀 상태
const DEFAULT_BETTING_POOL: ContextBettingPool = {
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
  selectedOption: "option1",
};

interface BettingContextType {
  updateBettingPool: (partialPool: PartialBettingPool) => Promise<void>;
}

type PartialBettingPool = Partial<{
  option1: Partial<BettingPool["option1"]>;
  option2: Partial<BettingPool["option2"]>;
  isPlaceBet: boolean;
  placeBetAmount: number;
  isBettingEnd: boolean;
  selectedOption: keyof BettingPool;
}>;

interface ContextBettingPool extends BettingPool {
  isPlaceBet: boolean;
  placeBetAmount: number;
  isBettingEnd: boolean;
  selectedOption: keyof BettingPool;
}
const BettingContext = React.createContext<BettingContextType>({
  updateBettingPool: async () => {},
});

function BettingProvider({ children }: { children: React.ReactNode }) {
  const { setSessionItem } = useSessionStorage();

  // 베팅 풀 업데이트 함수
  const updateBettingPool = React.useCallback(
    async (partialPool: PartialBettingPool) => {
      try {
        const newPool = {
          option1: {
            ...DEFAULT_BETTING_POOL.option1,
            ...(partialPool.option1 || {}),
          },
          option2: {
            ...DEFAULT_BETTING_POOL.option2,
            ...(partialPool.option2 || {}),
          },
          isPlaceBet: partialPool.isPlaceBet ?? DEFAULT_BETTING_POOL.isPlaceBet,
          placeBetAmount:
            partialPool.placeBetAmount ?? DEFAULT_BETTING_POOL.placeBetAmount,
          isBettingEnd:
            partialPool.isBettingEnd ?? DEFAULT_BETTING_POOL.isBettingEnd,
          selectedOption:
            partialPool.selectedOption ?? DEFAULT_BETTING_POOL.selectedOption,
        };

        // 먼저 세션 스토리지를 업데이트
        await setSessionItem(STORAGE_KEY, JSON.stringify(newPool));
      } catch (error) {
        console.error("베팅 풀 업데이트 실패:", error);
        throw error; // 에러를 상위로 전파하여 처리할 수 있도록 함
      }
    },
    [setSessionItem],
  );

  // Context 값 메모이제이션
  const value = React.useMemo(
    () => ({
      updateBettingPool,
    }),
    [updateBettingPool],
  );

  return (
    <BettingContext.Provider value={value}>{children}</BettingContext.Provider>
  );
}

export { BettingProvider, BettingContext };
