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

    const bettingResultResponse = await fetch(`/api/betresults/${roomId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!bettingResultResponse.ok) {
      throw new Error("배팅 결과를 가져오는데 실패했습니다.");
    }

    const { data } = await bettingResultResponse.json();
    const bettingResult = betResultResponseSchema.safeParse(data);

    try {
      const personalBetResultResponse = await fetch(`/api/bets/${roomId}`);
      const personalBetResult = await personalBetResultResponse.json();
      const parsedPersonalBetResult = PersonalBetResultResponseSchema.safeParse(
        personalBetResult.data,
      );
      if (!parsedPersonalBetResult.success) {
        throw redirect({
          to: "/my-page",
          replace: true,
        });
      }

      return {
        betResults: bettingResult.data,
        personalBetResult: parsedPersonalBetResult.data,
      };
    } catch {
      const session = await getSessionItem(STORAGE_KEY);
      const personalBetResult = JSON.parse(session);
      if (
        !personalBetResult ||
        !personalBetResult.placeBetAmount ||
        !personalBetResult.selectedOption
      ) {
        throw redirect({
          to: "/my-page",
          replace: true,
        });
      }

      const parsedPersonalBetResult = PersonalBetResultResponseSchema.safeParse(
        {
          betAmount: personalBetResult.placeBetAmount,
          selectedOption: personalBetResult.selectedOption,
        },
      );
      return {
        betResults: bettingResult.data,
        personalBetResult: parsedPersonalBetResult.data,
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
