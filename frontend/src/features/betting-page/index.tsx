import { DuckCoinIcon } from "@/shared/icons";
import { BettingStatsDisplay } from "./ui/BettingStatsDisplay";
import { PercentageDisplay } from "./ui/PercentageDisplay";
import { BettingForm } from "./ui/BettingForm";
import { BettingHeader } from "./ui/BettingHeader";
import { cn } from "@/shared/misc";
import React from "react";
import { useBettingContext } from "./hook/use-betting-context";

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
  const roomIdRef = React.useRef<string | null>(null);
  const { socket } = useBettingContext();

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

  React.useEffect(() => {
    socket.on("fetchRoomUsers", (data) => {
      console.log("fetchRoomUsers");
      console.log(data);
    });

    return () => socket.off("fetchRoomUsers");
  }, [socket]);

  React.useEffect(() => {
    if (!socket.isConnected) return;
    if (roomIdRef.current) return;
    fetch("/api/betrooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        channel: {
          title: "기아 vs 삼성 승부 예측",
          options: {
            option1: "기아",
            option2: "삼성",
          },
          settings: {
            duration: 120,
            defaultBetAmount: 100,
          },
        },
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw Error("방 생성에 실패했습니다.");
        }
      })
      .then((data) => {
        roomIdRef.current = data.data.roomId;
      })
      .catch((error) => console.error(error));

    return () => {
      socket.off("joinRoom");
    };
  }, [socket]);

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
