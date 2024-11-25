import { ProgressBar } from "@/shared/components/ProgressBar";
import { TimerIcon } from "@/shared/icons";
import { cn } from "@/shared/misc";
import { BettingStatsDisplay } from "./ui/BettingStatsDisplay";
import { PercentageDisplay } from "../betting-page/ui/PercentageDisplay";

interface BettingRoom {
  title: string;
  timeRemaining: number;
  option1: {
    content: string;
    stats: {
      coinAmount: number;
      bettingRate: string;
      participant: number;
      percentage: number;
    };
  };
  option2: {
    content: string;
    stats: {
      coinAmount: number;
      bettingRate: string;
      participant: number;
      percentage: number;
    };
  };
}

function BettingPageAdmin() {
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
    <div
      className={cn(
        "betting-container",
        "shadow-middle bg-layout-main flex h-fit max-h-[500px] w-full min-w-[630px] flex-col gap-4 rounded-lg border-2 px-10 py-6",
      )}
    >
      <div>
        <h1 className="text-xl font-extrabold">승부 예측 관리 시스템</h1>
      </div>
      <div>
        <div className="flex flex-col gap-2">
          <div className="text-md flex w-full items-center justify-between">
            <p className="text-default text-lg font-bold">승부 예측 주제</p>
            <p className="text-primary text-xl font-extrabold">
              KBO 우승은 KIA다!!
            </p>
          </div>

          <div className="flex gap-4">
            <TimerIcon width={24} height={24} />
            <ProgressBar
              max={100}
              value={30}
              uses="default"
              className="h-4 w-full"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-6">
        <BettingStatsDisplay
          stats={bettingData.option1.stats}
          uses={"winning"}
          content={bettingData.option1.content}
        />
        <BettingStatsDisplay
          stats={bettingData.option2.stats}
          uses={"losing"}
          content={bettingData.option2.content}
        />
      </div>

      <div className="flex flex-row gap-6">
        {[bettingData.option1, bettingData.option2].map((option, index) => (
          <PercentageDisplay
            key={`betting-percentage-${index}`}
            index={index}
            percentage={option.stats.percentage}
          />
        ))}
      </div>

      <div className="flex w-full justify-end font-extrabold">
        <div className="flex w-[50cqw] justify-end gap-6">
          <button className="bg-secondary rounded-lg border-2 border-slate-300 px-4 py-2">
            취소
          </button>
          <button className="bg-gradient-primary-button text-layout-main rounded-lg px-4 py-2 shadow-md">
            승부 예측 종료하기
          </button>
        </div>
      </div>
    </div>
  );
}

export { BettingPageAdmin };
