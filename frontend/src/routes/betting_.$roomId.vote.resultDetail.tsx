import { PredictDetail } from "@/features/predict-detail";
import { getBetResults } from "@/features/predict-detail/model/api";
import { GlobalErrorComponent } from "@/shared/components/Error/GlobalError";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const PersonalBetResultResponseSchema = z.object({
  betAmount: z.coerce.number().int().min(0),
  selectedOption: z.union([z.literal("option1"), z.literal("option2")]),
});

export const Route = createFileRoute("/betting_/$roomId/vote/resultDetail")({
  component: PredictDetail,
  loader: async ({ params }) => {
    const { roomId } = params;

    const betResults = await getBetResults(roomId);
    const personalBetResultResponse = await fetch(`/api/bets/${roomId}`);
    if (!personalBetResultResponse.ok) {
      throw new Error("베팅 결과를 불러오는데 실패했습니다.");
    }
    const personalBetResult = await personalBetResultResponse.json();
    const parsedPersonalBetResult = PersonalBetResultResponseSchema.safeParse(
      personalBetResult.data,
    );
    if (!parsedPersonalBetResult.success) {
      throw new Error("베팅 결과를 파싱하는데 실패했습니다.");
    }

    return { betResults, personalBetResult: parsedPersonalBetResult.data };
  },
  errorComponent: ({ error }) => {
    return <GlobalErrorComponent error={error} to="/" />;
  },
});
