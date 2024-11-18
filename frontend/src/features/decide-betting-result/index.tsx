import { DuckCoinIcon } from "@/assets/icons";
import { cn } from "@/shared/misc";

interface BettingStats {
  coinAmount: number;
  bettingRate: string;
  participant: number;
  percentage: number;
}

interface BettingRoom {
  title: string;
  timeRemaining: number;
  option1: {
    content: string;
    stats: BettingStats;
  };
  option2: {
    content: string;
    stats: BettingStats;
  };
}

function BettingResult({
  option,
  uses,
}: {
  option: {
    content: string;
    stats: BettingStats;
  };
  uses: "winning" | "losing";
}) {
  const color = uses === "winning" ? "text-bettingBlue" : "text-bettingPink";

  return (
    <div className={`flex flex-col items-center justify-center ${color}`}>
      <DuckCoinIcon />
      <div className="flex flex-col items-center pt-4">
        <p className="text-2xl font-extrabold">{option.content}</p>
        <div className="flex flex-row gap-2">
          <DuckCoinIcon width={36} height={36} />
          <span className="text-xl font-extrabold">
            {option.stats.coinAmount}!
          </span>
        </div>
      </div>
      <div className="text-default-disabled text-md text-pretty break-all">
        <span>
          {option.stats.participant} 명에게{" "}
          <DuckCoinIcon width={16} height={16} className="inline-block" />{" "}
          {option.stats.coinAmount * option.stats.participant} 포인트를 드립니다
        </span>
      </div>
    </div>
  );
}

function DecideBettingResult() {
  const bettingData: BettingRoom = {
    title: "KBO 우승은 KIA다!",
    timeRemaining: 445,
    option1: {
      content: "삼성",
      stats: {
        coinAmount: 1000,
        bettingRate: "1:12",
        participant: 100,
        percentage: 62,
      },
    },
    option2: {
      content: "KIA",
      stats: {
        coinAmount: 1000,
        bettingRate: "1:12",
        participant: 100,
        percentage: 62,
      },
    },
  };
  return (
    <form
      className={cn(
        "betting-container",
        "shadow-middle bg-layout-main h-full max-h-[430px] w-full min-w-[630px] rounded-lg border-2 p-6",
      )}
    >
      <h1 className="w-full text-center text-lg font-bold">
        승리한 팀을 선택 해주세요!
      </h1>
      <div className="flex h-full flex-row items-center">
        <div className="flex w-[50cqw] flex-col items-center gap-6">
          <BettingResult uses={"winning"} option={bettingData.option1} />
          <button
            className="bg-bettingBlue text-layout-main w-[40cqw] rounded-lg py-2"
            type="submit"
          >
            파란팀의 승리!
          </button>
        </div>
        <div className="flex w-[50cqw] flex-col items-center gap-6">
          <BettingResult uses={"losing"} option={bettingData.option2} />
          <button
            className="bg-bettingPink text-layout-main w-[40cqw] rounded-lg py-2"
            type="submit"
          >
            빨간팀의 승리!
          </button>
        </div>
      </div>
    </form>
  );
}

export { DecideBettingResult };
