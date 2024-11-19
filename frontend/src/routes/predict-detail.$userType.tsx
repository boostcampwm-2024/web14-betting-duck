import { createFileRoute } from "@tanstack/react-router";
import { PredictDetail } from "@/features/predict-detail";

export const Route = createFileRoute("/predict-detail/$userType")({
  component: PredictDetail,
});
