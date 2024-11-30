import { type QueryClient } from "@tanstack/react-query";
import { z } from "zod";
import {
  responseBetRoomInfo,
  responseUserInfoSchema,
} from "@betting-duck/shared";
import { validateAccess } from "@/shared/lib/validateAccess";
import { betRoomQueries } from "@/shared/api/responseBettingRoomInfo";
import { userInfoQueries } from "@/shared/hooks/useUserInfo";

type BetRoomInfo = z.infer<typeof responseBetRoomInfo>;
type UserInfo = z.infer<typeof responseUserInfoSchema>;

interface LoadBetRoomParams {
  roomId: string;
  signal: AbortSignal;
  queryClient: QueryClient;
}

function isBetRoomInfo(data: unknown): data is BetRoomInfo {
  const result = responseBetRoomInfo.safeParse(data);
  return result.success;
}

function isUserInfo(data: unknown): data is UserInfo {
  const result = responseUserInfoSchema.safeParse(data);
  return result.success;
}

function loaderTypeGuard(
  betRoomInfoData: unknown,
  userInfoData: unknown,
): { bettingRoomInfo: BetRoomInfo; userInfo: UserInfo } {
  if (!isBetRoomInfo(betRoomInfoData)) {
    throw new Error("배팅 방 정보를 파싱하는데 실패했습니다.");
  }

  if (!isUserInfo(userInfoData)) {
    throw new Error("사용자 정보를 파싱하는데 실패했습니다.");
  }

  return {
    bettingRoomInfo: betRoomInfoData,
    userInfo: userInfoData,
  };
}

export async function loadBetRoomData({
  roomId,
  signal,
  queryClient,
}: LoadBetRoomParams): Promise<{
  roomId: string;
  bettingRoomInfo: BetRoomInfo;
  userInfo: UserInfo;
}> {
  await validateAccess(roomId, signal);

  const betRoomQuery = betRoomQueries(roomId);
  const betRoomInfoData = await queryClient.fetchQuery({
    queryKey: betRoomQuery.roomInfo.queryKey,
    queryFn: betRoomQuery.roomInfo.queryFn,
  });

  const userInfoQuery = userInfoQueries;
  const userInfoData = await queryClient.fetchQuery({
    queryKey: userInfoQuery.queryKey,
    queryFn: userInfoQuery.queryFn,
  });

  const { bettingRoomInfo, userInfo } = loaderTypeGuard(
    betRoomInfoData,
    userInfoData,
  );

  return { roomId, bettingRoomInfo, userInfo };
}
