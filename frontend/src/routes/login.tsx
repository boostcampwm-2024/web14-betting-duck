import { createFileRoute } from "@tanstack/react-router";
import { PredictDetail } from "@/pages/predict-detail";

export const Route = createFileRoute("/login")({
  component: PredictDetail,
});
