import { cn } from "@/shared/misc";
import { BettingForm } from "./BettingForm";
import { BettingHeader } from "./BettingHeader";
import { BettingStatsDisplay } from "./BettingStatsDisplay";
import { PercentageDisplay } from "./PercentageDisplay";
import { DuckCoinIcon } from "@/shared/icons";
import { useBettingContext } from "../hook/use-betting-context";
import React from "react";
import { z } from "zod";
import { BettingPool } from "../utils/bettingOdds";

interface BettingStats {
  coinAmount: number;
  bettingRate: string;
  participant: number;
  percentage: number;
}

const bettingRoomSchema = z.object({
  channel: z.object({
    creator: z.string(),
    status: z.enum(["waiting", "active", "timeover", "finished"]),
    option1: z.object({
      participants: z.coerce.number().int().lte(Number.MAX_SAFE_INTEGER),
      currentBets: z.coerce.number().int().lte(Number.MAX_SAFE_INTEGER),
    }),
    option2: z.object({
      participants: z.coerce.number().int().lte(Number.MAX_SAFE_INTEGER),
      currentBets: z.coerce.number().int().lte(Number.MAX_SAFE_INTEGER),
    }),
  }),
});

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

function BettingContainer() {
  const {
    socket,
    bettingRoomInfo,
    bettingPool,
    updateBettingPool,
    bettingSummary,
  } = useBettingContext();

  const prevOption1Ref = React.useRef<Partial<BettingPool["option1"]>>(
    typeof window !== "undefined"
      ? (JSON.parse(window.sessionStorage.getItem("betting_pool") || "{}")
          ?.option1 ?? bettingPool.option1)
      : bettingPool.option1,
  );

  const prevOption2Ref = React.useRef<Partial<BettingPool["option2"]>>(
    typeof window !== "undefined"
      ? (JSON.parse(window.sessionStorage.getItem("betting_pool") || "{}")
          ?.option2 ?? bettingPool.option2)
      : bettingPool.option2,
  );
  React.useEffect(() => {
    if (!socket.isConnected) return;
    socket.emit("joinRoom", {
      channel: {
        roomId: bettingRoomInfo.channel.id,
      },
    });
  }, [socket, bettingRoomInfo]);

  React.useEffect(() => {
    if (!socket.isConnected) return;
    socket.emit("fetchBetRoomInfo", {
      roomId: bettingRoomInfo.channel.id,
    });
  }, [socket, bettingRoomInfo]);

  React.useEffect(() => {
    if (!socket.isConnected) return;

    socket.on("fetchBetRoomInfo", (data) => {
      const result = bettingRoomSchema.safeParse(data);
      console.log(result);
      if (!result.success) {
        console.error(result.error.errors);
        throw new Error("배팅 방 정보를 가져오는데 실패했습니다.");
      }

      const { channel } = result.data;
      if (
        prevOption1Ref.current.participants !== channel.option1.participants ||
        prevOption2Ref.current.participants !== channel.option2.participants
      ) {
        updateBettingPool({
          option1: {
            participants: channel.option1.participants,
            totalAmount: channel.option1.currentBets,
          },
          option2: {
            participants: channel.option2.participants,
            totalAmount: channel.option2.currentBets,
          },
        });
        prevOption1Ref.current = channel.option1;
        prevOption2Ref.current = channel.option2;
      }
    });

    return () => {
      socket.off("fetchBetRoomInfo");
    };
  }, [socket, updateBettingPool, bettingPool, bettingRoomInfo]);

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
      <button
        onClick={() =>
          socket.emit("joinBet", {
            sender: {
              betAmount: 300,
              selectOption: "option2", // enum option1, option2
            },
            channel: {
              roomId: bettingRoomInfo.channel.id,
            },
          })
        }
      >
        전송
      </button>
      <div className="flex h-full flex-col">
        <BettingHeader
          content={bettingData.title}
          time={bettingData.timeRemaining}
        />
        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-6">
            <BettingStatsDisplay
              stats={bettingSummary.option1}
              content={bettingData.option1.content}
              uses="winning"
            />
            <BettingStatsDisplay
              stats={bettingSummary.option2}
              content={bettingData.option2.content}
              uses="losing"
            />
          </div>
          <div className="flex flex-row gap-6">
            <PercentageDisplay
              index={0}
              percentage={parseInt(bettingSummary.option1Percentage)}
            />
            <PercentageDisplay
              index={1}
              percentage={parseInt(bettingSummary.option2Percentage)}
            />
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

export { BettingContainer };
