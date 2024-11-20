import { createFileRoute } from "@tanstack/react-router";
import { BettingPage } from "@/features/betting-page";
import { z } from "zod";

const BettingSearchParams = z.object({
  nickname: z.string(),
});

export const Route = createFileRoute("/betting-page")({
  component: BettingPage,
  validateSearch: BettingSearchParams,
});
