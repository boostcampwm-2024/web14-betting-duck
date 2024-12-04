import { PredictDetail } from "@/features/predict-detail";
import { GlobalErrorComponent } from "@/shared/components/Error/GlobalError";
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
    if (!bettingResult.success) {
      throw redirect({
        to: "/my-page",
        replace: true,
      });
    }

    const personalBetResultResponse = await fetch(`/api/bets/${roomId}`);
    if (!personalBetResultResponse.ok) {
      throw redirect({
        to: "/my-page",
        replace: true,
      });
    }
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
  },
  errorComponent: ({ error }) => {
    return <GlobalErrorComponent error={error} to="/" />;
  },
});
