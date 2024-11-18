import { createFileRoute } from "@tanstack/react-router";
import { PredictDetail } from "@/features/predict-detail";

export const Route = createFileRoute("/login")({
  component: PredictDetail,
});
