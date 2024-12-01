import { cn } from "@/shared/misc";
import { useBettingContext } from "../hook/useBettingContext";
import { placeBetting } from "../utils/placeBetting";
import { useSocketIO } from "@/shared/hooks/useSocketIo";
import { useLoaderData } from "@tanstack/react-router";
import { TotalBettingDisplay } from "./TotalBettingDisplay";
import { BettingHeader } from "./BettingHeader";
import { BettingInput } from "./BettingInput";
import { BettingFooter } from "./BettingFooter";
import { responseUserInfoSchema } from "@betting-duck/shared";
import { endBetRoom } from "@/features/decide-betting-result/api/endBetRoom";
import React from "react";
import { userBettingStatusSchema } from "../model/schema";
import { z } from "zod";

function BettingContainer({
  socket,
}: {
  socket: ReturnType<typeof useSocketIO>;
}) {
  const contextValue = useBettingContext();
  const { bettingPool } = contextValue;
  const { bettingRoomInfo } = useLoaderData({
    from: "/betting_/$roomId/vote/voting",
  });
  const { channel } = bettingRoomInfo;
  const [userBettingStatus, setUserBettingStatus] = React.useState<
    z.infer<typeof userBettingStatusSchema>
  >({
    betAmount: 0,
    selectedOption: "none",
  });

  const refreshBettingAmount = React.useCallback(async (roomId: string) => {
    try {
      const response = await fetch(`/api/bets/${roomId}`);
      if (!response.ok) {
        throw new Error("베팅 데이터를 불러오는데 실패했습니다.");
      }

      const { data } = await response.json();
      const parsedData = userBettingStatusSchema.safeParse(data);
      if (!parsedData.success) {
        console.error(parsedData.error);
        throw new Error("베팅 데이터를 불러오는데 실패했습니다.");
      }

      console.log("베팅 데이터:", data);
      setUserBettingStatus(parsedData.data);
    } catch (error) {
      console.error("베팅 데이터 새로고침 실패:", error);
    }
  }, []);

  return (
    <div
      className={cn(
        "betting-container",
        "bg-layout-main h-full min-w-[70cqw] p-6",
      )}
    >
      <button
        onClick={() => {
          placeBetting({
            selectedOption: "option1",
            bettingAmount: 1,
            roomId: channel.id,
            isPlaceBet: bettingPool.isPlaceBet || false,
            refreshBettingAmount,
          });
        }}
      >
        돈배팅
      </button>
      <button
        onClick={async () => {
          const response = await fetch("/api/users/userInfo");
          if (!response.ok) {
            throw new Error("사용자 정보를 불러오는데 실패했습니다.");
          }

          const { data } = await response.json();
          console.log(data);
          const result = responseUserInfoSchema.safeParse(data);
          if (!result.success) {
            console.error(result.error);
            throw new Error("사용자 정보를 불러오는데 실패했습니다.");
          }

          return data;
        }}
      >
        읽기
      </button>
      <button
        onClick={async () => {
          try {
            const roomId = channel.id;
            const message = await endBetRoom(roomId, "option1");
            console.log(message);
          } catch (error) {
            if (error instanceof Error) {
              console.error("API 요청 실패:", error.message);
            } else {
              console.error("알 수 없는 오류 발생");
            }
          }
        }}
      >
        끝내기
      </button>
      <div className="flex h-full flex-col justify-around">
        <BettingHeader
          socket={socket}
          content={channel.title}
          contextValue={contextValue}
        />
        <TotalBettingDisplay socket={socket} channel={channel} />
        <div className="flex justify-around">
          <BettingInput
            key={"winning-betting-input"}
            uses={"winning"}
            refreshBettingAmount={refreshBettingAmount}
          />
          <BettingInput
            key={"losing-betting-input"}
            uses={"losing"}
            refreshBettingAmount={refreshBettingAmount}
          />
        </div>
        <BettingFooter userBettingStatus={userBettingStatus} />
      </div>
    </div>
  );
}

export { BettingContainer };
