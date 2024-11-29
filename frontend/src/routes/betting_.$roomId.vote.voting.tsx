import { createFileRoute } from "@tanstack/react-router";
import { BettingPage } from "@/features/betting-page";

export const Route = createFileRoute("/betting_/$roomId/vote/voting")({
  component: BettingPage,
});
