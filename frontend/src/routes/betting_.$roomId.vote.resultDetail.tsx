import { STORAGE_KEY } from "@/features/betting-page/model/var";
import { PredictDetail } from "@/features/predict-detail";
import { GlobalErrorComponent } from "@/shared/components/Error/GlobalError";
import { getSessionItem } from "@/shared/hooks/useSessionStorage";
import { BettingRoomInfoSchema } from "@/shared/types";
import { betResultResponseSchema } from "@betting-duck/shared";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

const PersonalBetResultResponseSchema = z.object({
  betAmount: z.coerce.number().int().min(0),
  selectedOption: z.union([z.literal("option1"), z.literal("option2")]),
});

export const Route = createFileRoute("/betting_/$roomId/vote/resultDetail")({
  component: PredictDetail,
  loader: async ({ params }) => {
    const { roomId } = params;

    // 배팅 결과 가져오기
    const bettingResultResponse = await fetch(`/api/betresults/${roomId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!bettingResultResponse.ok) {
      throw redirect({
        to: "/my-page",
        replace: true,
      });
    }

    const { data } = await bettingResultResponse.json();
    const bettingResult = betResultResponseSchema.safeParse(data);

    if (!bettingResult.success) {
      throw redirect({
        to: "/my-page",
        replace: true,
      });
    }

    // 개인 배팅 결과 처리
    try {
      // 먼저 세션 스토리지 확인
      const session = await getSessionItem(STORAGE_KEY);
      let personalBetResult;

      if (session) {
        const sessionData = JSON.parse(session);
        if (sessionData.placeBetAmount && sessionData.selectedOption) {
          personalBetResult = {
            betAmount: sessionData.placeBetAmount,
            selectedOption: sessionData.selectedOption,
          };
        }
      }

      // 세션에 데이터가 없는 경우에만 API 호출 시도
      if (!personalBetResult) {
        try {
          const personalBetResultResponse = await fetch(`/api/bets/${roomId}`);
          if (personalBetResultResponse.ok) {
            const data = await personalBetResultResponse.json();
            const parsedResult = PersonalBetResultResponseSchema.safeParse(
              data.data,
            );
            if (parsedResult.success) {
              personalBetResult = parsedResult.data;
            }
          }
        } catch {
          // API 호출 실패는 무시
        }
      }

      // personalBetResult가 없는 경우 빈 객체 반환
      return {
        betResults: bettingResult.data,
        personalBetResult: personalBetResult || {
          betAmount: 0,
          selectedOption: "option1",
        },
      };
    } catch (error) {
      console.log(error);
      return {
        betResults: bettingResult.data,
        personalBetResult: {
          betAmount: 0,
          selectedOption: "option1",
        },
      };
    }
  },
  errorComponent: ({ error }) => {
    return <GlobalErrorComponent error={error} to="/" />;
  },
  onLeave: async ({ params, context: { queryClient } }) => {
    const { roomId } = params;
    const bettingData = queryClient.getQueryData(["bettingRoom", roomId]);
    const bettingRoomInfo = BettingRoomInfoSchema.safeParse(bettingData);
    if (!bettingRoomInfo.success) {
      throw new Error("방 정보를 불러오는데 실패했습니다.");
    }

    if (bettingRoomInfo.data.channel.status !== "active") {
      return sessionStorage.removeItem(STORAGE_KEY);
    }
  },
});
