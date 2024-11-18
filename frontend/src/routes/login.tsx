import { createFileRoute } from "@tanstack/react-router";
import { DecideBettingResult } from "@/pages/decide-betting-result";

export const Route = createFileRoute("/login")({
  component: DecideBettingResult,
});
