import React from "react";
import { useSocketIO } from "@/shared/hooks/useSocketIo";

function BettingHeader({
  socket,
  content,
}: {
  socket: ReturnType<typeof useSocketIO>;
  content: string;
}) {
  const [isBettingEnd, setIsBettingEnd] = React.useState(false);

  React.useEffect(() => {
    socket.on("timeover", () => setIsBettingEnd(true));

    return () => {
      socket.off("timeover");
    };
  }, [setIsBettingEnd, socket]);

  return (
    <div className="bg-secondary mb-4 rounded-lg p-3 text-center shadow-inner">
      <h1 className="text-default-disabled text-md mb-1 font-bold">
        배팅 주제
      </h1>
      <h1 className="mb-1 pt-2 text-4xl font-bold">
        {isBettingEnd ? "투표 시간이 종료 되었습니다!" : content}
      </h1>
      <p className="text-m">
        {isBettingEnd
          ? "방장이 결과를 결정 할 때까지 기다려 주세요!"
          : "투표가 진행 중입니다! 제한 시간 내에 둘 중 하나 배팅을 해주세요!"}
      </p>
    </div>
  );
}

export { BettingHeader };
