import { createFileRoute } from "@tanstack/react-router";
import { BettingPage } from "@/features/betting-page";
import { loadBetRoomData } from "@/shared/lib/loader/useBetRoomLoader";
import { queryClient } from "@/shared/lib/auth/authQuery";
import { responseBetRoomInfo } from "@betting-duck/shared";
import { z } from "zod";

type BetRoomResponse = z.infer<typeof responseBetRoomInfo>;

interface RouteLoaderData {
  roomId: string;
  bettingRoomInfo: BetRoomResponse;
  duckCoin: number;
}

export const Route = createFileRoute("/betting_/$roomId/vote/voting")({
  component: BettingPage,
  loader: async ({ params, abortController }): Promise<RouteLoaderData> => {
    const { roomId } = params;

    const { bettingRoomInfo, userInfo } = await loadBetRoomData({
      roomId,
      signal: abortController.signal,
      queryClient,
    });

    return { roomId, bettingRoomInfo, duckCoin: userInfo.duck };
  },
});
