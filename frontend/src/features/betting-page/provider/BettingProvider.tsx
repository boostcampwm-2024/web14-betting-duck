import React, { useState, useEffect } from "react";
import { responseBetRoomInfo } from "@betting-duck/shared";
import { z } from "zod";
import { type BettingPool } from "@/shared/utils/bettingOdds";
import { getBettingRoomInfo } from "../api/getBettingRoomInfo";
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
  bettingRoomInfo: z.infer<typeof responseBetRoomInfo>;
  bettingPool: ContextBettingPool;
  updateBettingPool: (partialPool: PartialBettingPool) => Promise<void>;
  updateBettingRoomInfo: () => Promise<void>;
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

// Context 생성 시 기본값 제공
const BettingContext = React.createContext<BettingContextType>({
  bettingRoomInfo: {} as z.infer<typeof responseBetRoomInfo>,
  bettingPool: DEFAULT_BETTING_POOL,
  updateBettingPool: async () => {},
  updateBettingRoomInfo: async () => {},
});

function bettingRoomInfoTypeGuard(
  info: unknown,
): info is z.infer<typeof responseBetRoomInfo> {
  return responseBetRoomInfo.safeParse(info).success;
}

function BettingProvider({ children }: { children: React.ReactNode }) {
  // 초기화 상태 관리
  const [isInitialized] = useState(false);
  const [isStorageLoaded, setIsStorageLoaded] = useState(false);
  const { setSessionItem, getSessionItem } = useSessionStorage();

  // 상태 관리
  const [currentBettingRoomInfo, setCurrentBettingRoomInfo] = useState<
    z.infer<typeof responseBetRoomInfo>
  >({} as z.infer<typeof responseBetRoomInfo>);
  const [bettingPool, setBettingPool] =
    useState<ContextBettingPool>(DEFAULT_BETTING_POOL);

  // 세션 스토리지 초기화
  useEffect(() => {
    const initializeFromStorage = async () => {
      try {
        const savedState = await getSessionItem(STORAGE_KEY);
        if (savedState) {
          const parsedState = JSON.parse(savedState) as ContextBettingPool;
          setBettingPool(parsedState);
        }
      } catch (error) {
        console.error("세션 스토리지 초기화 실패:", error);
      } finally {
        setIsStorageLoaded(true);
      }
    };

    initializeFromStorage();
  }, [getSessionItem]);

  // 베팅 풀 업데이트 함수
  const updateBettingPool = React.useCallback(
    async (partialPool: PartialBettingPool) => {
      try {
        setBettingPool((prevPool) => {
          const newPool = {
            option1: { ...prevPool.option1, ...(partialPool.option1 || {}) },
            option2: { ...prevPool.option2, ...(partialPool.option2 || {}) },
            isPlaceBet: partialPool.isPlaceBet ?? prevPool.isPlaceBet,
            placeBetAmount:
              partialPool.placeBetAmount ?? prevPool.placeBetAmount,
            isBettingEnd: partialPool.isBettingEnd ?? prevPool.isBettingEnd,
            selectedOption:
              partialPool.selectedOption ?? prevPool.selectedOption,
          };

          // 세션 스토리지 업데이트를 비동기로 처리
          setSessionItem(STORAGE_KEY, JSON.stringify(newPool)).catch(
            console.error,
          );

          return newPool;
        });
      } catch (error) {
        console.error("베팅 풀 업데이트 실패:", error);
      }
    },
    [setSessionItem], // bettingPool 의존성 제거
  );

  // 베팅룸 정보 업데이트 함수
  const updateBettingRoomInfo = React.useCallback(async () => {
    try {
      const updatedBettingRoomInfo = await getBettingRoomInfo(
        currentBettingRoomInfo.channel.id,
      );

      if (!bettingRoomInfoTypeGuard(updatedBettingRoomInfo)) {
        throw new Error("Invalid betting room info received");
      }

      setCurrentBettingRoomInfo(updatedBettingRoomInfo);
    } catch (error) {
      console.error("베팅룸 정보 업데이트 실패:", error);
    }
  }, [currentBettingRoomInfo.channel?.id]);

  // Context 값 메모이제이션
  const value = React.useMemo(
    () => ({
      bettingRoomInfo: currentBettingRoomInfo,
      bettingPool,
      updateBettingPool,
      updateBettingRoomInfo,
    }),
    [
      currentBettingRoomInfo,
      bettingPool,
      updateBettingPool,
      updateBettingRoomInfo,
    ],
  );

  // 초기화가 완료될 때까지 렌더링 지연
  if (!isInitialized || !isStorageLoaded) {
    return null; // 또는 로딩 컴포넌트
  }

  return (
    <BettingContext.Provider value={value}>{children}</BettingContext.Provider>
  );
}

export { BettingProvider, BettingContext };
