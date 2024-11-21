import { createFileRoute } from "@tanstack/react-router";
import { BettingPage } from "@/features/betting-page";
import { z } from "zod";

const BettingSearchParams = z.object({
  nickname: z.string().transform((val) => {
    if (!val) return "";
    try {
      return decodeURIComponent(val);
    } catch {
      return val;
    }
  }),
});

export const Route = createFileRoute("/betting-page")({
  component: BettingPage,
  validateSearch: BettingSearchParams,
  beforeLoad: ({ search }) => {
    if (typeof search.nickname !== "string") {
      return {
        search: {
          nickname: decodeURIComponent(search.nickname),
        },
      };
    }
    return { search };
  },
});
