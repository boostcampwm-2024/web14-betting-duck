import React from "react";
import { useBettingContext } from "../hook/useBettingContext";

function BettingHeader({
  content,
  contextValue,
}: {
  content: string;
  contextValue: ReturnType<typeof useBettingContext>;
}) {
  const { socket, bettingPool, updateBettingPool } = contextValue;

  React.useEffect(() => {
    socket.on("timeover", () => updateBettingPool({ isBettingEnd: true }));

    return () => socket.off("timeover");
  }, [socket, updateBettingPool]);

  return (
    <div className="bg-secondary mb-4 rounded-lg p-3 text-center shadow-inner">
      <h1 className="mb-1 text-4xl font-bold">
        {bettingPool.isBettingEnd ? "투표 시간이 종료 되었습니다!" : content}
      </h1>
      <p className="text-m">
        {bettingPool.isBettingEnd
          ? "방장이 결과를 결정 할 때까지 기다려 주세요!"
          : "투표가 진행 중입니다! 제한 시간 내에 둘 중 하나 배팅을 해주세요!"}
      </p>
    </div>
  );
}

export { BettingHeader };
