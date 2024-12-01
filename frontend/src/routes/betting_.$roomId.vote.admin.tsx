import { BettingPageAdmin } from "@/features/betting-page-admin";
import { createFileRoute } from "@tanstack/react-router";
import { loadBetRoomData } from "@/shared/lib/loader/useBetRoomLoader";
import { queryClient } from "@/shared/lib/auth/authQuery";
import {
  responseBetRoomInfo,
  responseUserInfoSchema,
} from "@betting-duck/shared";
import { z } from "zod";
import { getBettingRoomInfo } from "@/features/betting-page/api/getBettingRoomInfo";
import { STORAGE_KEY } from "@/features/betting-page/model/var";

type BetRoomResponse = z.infer<typeof responseBetRoomInfo>;
type UserInfo = z.infer<typeof responseUserInfoSchema>;

interface RouteLoaderData {
  roomId: string;
  bettingRoomInfo: BetRoomResponse;
  userInfo: UserInfo;
}

export const Route = createFileRoute("/betting_/$roomId/vote/admin")({
  component: BettingPageAdmin,
  beforeLoad: async ({ params }) => {
    const { roomId } = params;
    const roomInfo = await getBettingRoomInfo(roomId);
    if (!roomInfo) {
      throw new Error("방 정보를 불러오는데 실패했습니다.");
    }

    if (!roomInfo.channel.isAdmin) {
      throw redirect({
        to: `/betting/${roomId}/vote/voting`,
      });
    }
  },
  loader: async ({ params, abortController }): Promise<RouteLoaderData> => {
    const { roomId } = params;

    const { bettingRoomInfo, userInfo } = await loadBetRoomData({
      roomId,
      signal: abortController.signal,
      queryClient,
    });

    return { roomId, bettingRoomInfo, userInfo };
  },
  onLeave: async ({ params }) => {
    const { roomId } = params;
    const bettingRoomInfo = await getBettingRoomInfo(roomId);

    if (bettingRoomInfo?.channel.status !== "active") {
      console.log(bettingRoomInfo);
      return sessionStorage.removeItem(STORAGE_KEY);
    }
  },
});
