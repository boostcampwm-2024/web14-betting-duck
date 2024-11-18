import { DuckCoinIcon } from "@shared/icons";
import { BettingStatsDisplay } from "./BettingStatsDisplay";
import { PercentageDisplay } from "./PercentageDisplay";
import { BettingForm } from "./BettingForm";
import { BettingHeader } from "./BettingHeader";
import { cn } from "@/shared/misc";
import { useSocketIO } from "@/shared/hooks/use-socket-io";
import React from "react";
import { fetchBetRoomInfoRequestSchema } from "@betting-duck/shared";
import { responseFetchBetRoomInfoSchema } from "@betting-duck/shared";

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
  const socket = useSocketIO({
    url: "/api/betting",
    onConnect: () => {
      console.log("connected");
    },
    onDisconnect: () => {
      console.log("disconnected");
    },
  });
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
    socket.on("fetchBetRoomInfo", (data) => {
      console.log(data);
      const response = responseFetchBetRoomInfoSchema.safeParse(data);
      if (response.error) {
        console.error(
          "서버로 부터 반환되는 데이터에 타입이 맞지 않습니다.",
          response.error,
        );
        return;
      }

      console.log(response.data);
    });

    socket.on("error", (error) => {
      console.log(error);
    });

    const roomId = fetchBetRoomInfoRequestSchema.safeParse({ roomId: "1234" });
    if (!roomId.success) {
      console.error(roomId.error.errors);
      return;
    }

    socket.emit("fetchBetRoomInfo", roomId.data);
  }, [socket]);

  return (
    <div
      className={cn(
        "betting-container",
        "shadow-middle bg-layout-main h-full max-h-[430px] w-full min-w-[630px] rounded-lg border-2 p-6",
      )}
    >
      <button
        onClick={() => {
          const roomId = fetchBetRoomInfoRequestSchema.safeParse({
            roomId: "1234",
          });
          if (!roomId.success) {
            console.error(roomId.error.errors);
            return;
          }

          socket.emit("fetchBetRoomInfo", roomId.data);
        }}
      >
        전송하기
      </button>
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
