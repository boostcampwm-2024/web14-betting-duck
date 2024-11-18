import { DuckCoinIcon } from "@/assets/icons";
import { BettingStatsDisplay } from "./BettingStatsDisplay";
import { PercentageDisplay } from "./PercentageDisplay";
import { BettingForm } from "./BettingForm";
import { BettingHeader } from "./BettingHeader";
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

function BettingPage() {
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
        "shadow-middle bg-layout-main h-full max-h-[430px] w-full min-w-[630px] rounded-lg border-2 p-6",
      )}
    >
      <div className="flex h-full flex-col">
        <BettingHeader
          content={bettingData.title}
          time={bettingData.timeRemaining}
        />
        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-6">
            <BettingStatsDisplay
              stats={bettingData.option1.stats}
              content={bettingData.option1.content}
              uses="winning"
            />
            <BettingStatsDisplay
              stats={bettingData.option2.stats}
              content={bettingData.option2.content}
              uses="losing"
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
          <BettingForm />
        </div>

        <div className="flex items-center justify-end gap-2 pt-4 text-center font-bold text-gray-600">
          소유 금액:{" "}
          <span className="flex items-center gap-2 font-extrabold">
            <DuckCoinIcon width={26} height={26} />
            3000
          </span>
        </div>
      </div>
    </div>
  );
}

export { BettingPage };
