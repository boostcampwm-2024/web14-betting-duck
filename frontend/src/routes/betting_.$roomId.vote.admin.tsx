import { BettingPageAdmin } from "@/features/betting-page-admin";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/betting_/$roomId/vote/admin")({
  component: RouteComponent,
});

function RouteComponent() {
  return <BettingPageAdmin />;
}
