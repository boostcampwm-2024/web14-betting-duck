import React from "react";
import { useBettingContext } from "../hook/useBettingContext";
import { useSocketIO } from "@/shared/hooks/useSocketIo";

function BettingHeader({
  socket,
  content,
  contextValue,
}: {
  socket: ReturnType<typeof useSocketIO>;
  content: string;
  contextValue: ReturnType<typeof useBettingContext>;
}) {
  const { bettingPool, updateBettingPool } = contextValue;

  const currentBettingEnd = React.useMemo(() => {
    return bettingPool.isBettingEnd;
  }, [bettingPool.isBettingEnd]);

  const handleTimeOver = React.useCallback(() => {
    updateBettingPool({ isBettingEnd: true });
  }, [updateBettingPool]);

  React.useEffect(() => {
    socket.on("timeover", () => handleTimeOver);

    return () => {
      socket.off("timeover");
    };
  }, [handleTimeOver, socket]);

  return (
    <div className="bg-secondary mb-4 rounded-lg p-3 text-center shadow-inner">
      <h1 className="text-default-disabled text-md mb-1 font-bold">
        베팅 주제
      </h1>
      <h1 className="mb-1 pt-2 text-4xl font-bold">
        {currentBettingEnd ? "투표 시간이 종료 되었습니다!" : content}
      </h1>
      <p className="text-m">
        {currentBettingEnd
          ? "방장이 결과를 결정 할 때까지 기다려 주세요!"
          : "투표가 진행 중입니다! 제한 시간 내에 둘 중 하나 베팅을 해주세요!"}
      </p>
    </div>
  );
}

export { BettingHeader };
