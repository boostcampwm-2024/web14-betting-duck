import { BettingStatsDisplay } from "@/shared/components/BettingStatsDisplay/BettingStatsDisplay";
import { useSocketIO } from "@/shared/hooks/useSocketIo";
import React from "react";
import { z } from "zod";
import { responseBetRoomInfo } from "@betting-duck/shared";
import { PercentageDisplay } from "@/shared/components/PercentageDisplay/PercentageDisplay";
import { getBettingSummary } from "@/shared/utils/bettingOdds";
import { bettingRoomSchema } from "../model/schema";

function TotalBettingDisplay({
  channel,
  socket,
}: {
  channel: z.infer<typeof responseBetRoomInfo>["channel"];
  socket: ReturnType<typeof useSocketIO>;
}) {
  const [bettingSummary, setBettingSummary] = React.useState<
    ReturnType<typeof getBettingSummary>
  >({
    totalParticipants: 0,
    totalAmount: 0,
    option1Percentage: "0",
    option2Percentage: "0",
    option1: {
      participants: 0,
      totalAmount: 0,
      multiplier: 0,
      returnRate: 0,
    },
    option2: {
      participants: 0,
      totalAmount: 0,
      multiplier: 0,
      returnRate: 0,
    },
  });

  const handleFetchBetRoomInfo = React.useCallback((data: unknown) => {
    const parsedData = bettingRoomSchema.safeParse(data);
    if (!parsedData.success) return;
    const { channel } = parsedData.data;

    const summary = getBettingSummary({
      option1: {
        totalAmount: channel.option1.currentBets,
        participants: channel.option1.participants,
      },
      option2: {
        totalAmount: channel.option2.currentBets,
        participants: channel.option2.participants,
      },
    });
    setBettingSummary(summary);
  }, []); // 의존성 없음

  React.useEffect(() => {
    socket.on("fetchBetRoomInfo", handleFetchBetRoomInfo);

    return () => {
      socket.off("fetchBetRoomInfo");
    };
  }, [socket, handleFetchBetRoomInfo]);

  return (
    <div className="flex w-full justify-around">
      <div className="flex w-full max-w-[45cqw] justify-between">
        <BettingStatsDisplay
          stats={bettingSummary.option1}
          content={channel.options.option1.name}
          uses="winning"
          className="min-w-[35cqw]"
        >
          <PercentageDisplay
            index={0}
            percentage={parseInt(bettingSummary.option1Percentage)}
          />
        </BettingStatsDisplay>
      </div>
      <div className="flex w-full max-w-[45cqw] justify-between">
        <BettingStatsDisplay
          stats={bettingSummary.option2}
          content={channel.options.option2.name}
          uses="losing"
          className="min-w-[35cqw]"
        >
          <PercentageDisplay
            index={1}
            percentage={parseInt(bettingSummary.option2Percentage)}
          />
        </BettingStatsDisplay>
      </div>
    </div>
  );
}

export { TotalBettingDisplay };
