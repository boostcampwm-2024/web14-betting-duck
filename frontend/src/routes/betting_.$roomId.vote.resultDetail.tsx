import { PredictDetail } from "@/features/predict-detail";
import { getBetResults } from "@/features/predict-detail/model/api";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/betting_/$roomId/vote/resultDetail")({
  component: PredictDetail,
  loader: async ({ params }) => {
    const { roomId } = params;

    const betResults = await getBetResults(roomId);
    return betResults;
  },
});
