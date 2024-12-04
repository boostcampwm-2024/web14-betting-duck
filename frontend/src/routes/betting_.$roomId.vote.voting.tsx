import { createFileRoute, redirect } from "@tanstack/react-router";
import { BettingPage } from "@/features/betting-page";
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

export const Route = createFileRoute("/betting_/$roomId/vote/voting")({
  component: BettingPage,
  beforeLoad: async ({ params }) => {
    const { roomId } = params;

    const bettingRoomInfo = await getBettingRoomInfo(roomId);

    if (bettingRoomInfo?.channel.isAdmin) {
      throw redirect({
        to: "/betting/$roomId/vote/admin",
        params: { roomId },
      });
    }
  },
  loader: async ({ params }): Promise<RouteLoaderData> => {
    const { roomId } = params;

    const betRoomResponse = await fetch(`/api/betrooms/${roomId}`);
    if (!betRoomResponse.ok) {
      throw new Error("베팅 방 정보를 불러오는데 실패했습니다.");
    }
    const bettingRoomInfo = await betRoomResponse.json();

    const userInfoResponse = await fetch("/api/users/userInfo");
    if (!userInfoResponse.ok) {
      throw new Error("사용자 정보를 불러오는데 실패했습니다.");
    }
    const userInfo = await userInfoResponse.json();

    return {
      roomId,
      bettingRoomInfo: bettingRoomInfo.data,
      userInfo: userInfo.data,
    };
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
