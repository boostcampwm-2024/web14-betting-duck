import { createFileRoute } from "@tanstack/react-router";
import { PredictDetail } from "@/features/predict-detail";
import { UserProvider } from "@/app/provider/UserProvider";

export const Route = createFileRoute("/betting_/$roomId/vote/resultDetail")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <UserProvider>
      <PredictDetail />
    </UserProvider>
  );
}
