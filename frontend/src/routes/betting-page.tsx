import { createFileRoute } from "@tanstack/react-router";
import { BettingPageAdmin } from "@/features/betting-page-admin";

export const Route = createFileRoute("/betting-page")({
  component: BettingPageAdmin,
});
