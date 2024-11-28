import { createFileRoute } from "@tanstack/react-router";
import { PredictDetail } from "@/features/predict-detail";

export const Route = createFileRoute("/betting_/$roomId/vote/resultDetail")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PredictDetail />;
}
