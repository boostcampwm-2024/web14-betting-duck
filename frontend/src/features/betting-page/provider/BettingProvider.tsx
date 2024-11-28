import { useSocketIO } from "@/shared/hooks/useSocketIo";
import { useLoaderData } from "@tanstack/react-router";
import React from "react";
import { responseBetRoomInfo } from "@betting-duck/shared";
import { z } from "zod";
import { type BettingPool, getBettingSummary } from "../utils/bettingOdds";
import { useSessionStorage } from "@/shared/hooks/useSessionStorage";
import { useEffectOnce } from "@/shared/hooks/useEffectOnce";

interface BettingContextType {
  socket: ReturnType<typeof useSocketIO>;
  bettingRoomInfo: z.infer<typeof responseBetRoomInfo>;
  bettingPool: ContextBettingPool;
  bettingSummary: ReturnType<typeof getBettingSummary>;
  updateBettingPool: (partialPool: PartialBettingPool) => void;
}

type PartialBettingPool = Partial<{
  option1: Partial<BettingPool["option1"]>;
  option2: Partial<BettingPool["option2"]>;
  isBettingEnd?: boolean;
}>;

interface ContextBettingPool extends BettingPool {
  isBettingEnd: boolean;
}

const BettingContext = React.createContext<BettingContextType | null>(null);

function bettingRoomInfoTypeGuard(
  info: unknown,
): info is z.infer<typeof responseBetRoomInfo> {
  return responseBetRoomInfo.safeParse(info).success;
}

const STORAGE_KEY = "betting_pool";
function BettingProvider({ children }: { children: React.ReactNode }) {
  const { getSessionItem, setSessionItem } = useSessionStorage();
  const [bettingPool, setBettingPool] = React.useState<ContextBettingPool>({
    option1: {
      totalAmount: 0,
      participants: 0,
    },
    option2: {
      totalAmount: 0,
      participants: 0,
    },
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

  const { bettingRoomInfo } = useLoaderData({ from: "/betting_/$roomId/vote" });
  if (!bettingRoomInfoTypeGuard(bettingRoomInfo)) {
    throw new Error("배팅 방 정보를 가져오는데 실패했습니다.");
  }

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
        isBettingEnd: partialPool.isBettingEnd ?? bettingPool.isBettingEnd,
      };

      try {
        await setSessionItem(STORAGE_KEY, JSON.stringify(newPool));
        setBettingPool(newPool);
      } catch (error) {
        console.error("Failed to save betting pool to sessionStorage:", error);
      }
    },
    [setSessionItem, bettingPool],
  );

  useEffectOnce(() => {
    async function initializedBettingPool() {
      try {
        const storedPool = await getSessionItem(STORAGE_KEY);
        if (storedPool) {
          const parsedPool = JSON.parse(storedPool);
          setBettingPool(parsedPool);
        }
      } catch (error) {
        console.error("Failed to initialize betting pool:", error);
      }
    }

    initializedBettingPool();
  });

  React.useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY && event.newValue) {
        try {
          const newPool = JSON.parse(event.newValue);
          setBettingPool(newPool);
        } catch (error) {
          console.error("Failed to parse betting pool from storage:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const value = React.useMemo(
    () => ({
      socket,
      bettingRoomInfo,
      bettingPool,
      bettingSummary,
      updateBettingPool,
    }),
    [socket, bettingRoomInfo, bettingPool, bettingSummary, updateBettingPool],
  );

  return (
    <BettingContext.Provider value={value}>{children}</BettingContext.Provider>
  );
}

export { BettingProvider, BettingContext };
