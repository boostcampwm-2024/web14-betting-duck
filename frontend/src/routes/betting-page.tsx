import { createFileRoute } from "@tanstack/react-router";
import { BettingPage } from "@/features/betting-page";

export const Route = createFileRoute("/betting-page")({
  component: BettingPage,
});
