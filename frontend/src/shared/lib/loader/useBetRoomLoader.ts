import { type QueryClient } from "@tanstack/react-query";
import { z } from "zod";
import {
  responseBetRoomInfo,
  responseUserInfoSchema,
} from "@betting-duck/shared";
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
    throw new Error("베팅 방 정보를 파싱하는데 실패했습니다.");
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
  queryClient,
}: LoadBetRoomParams): Promise<{
  roomId: string;
  bettingRoomInfo: BetRoomInfo;
  userInfo: UserInfo;
}> {
  const betRoomQuery = betRoomQueries(roomId);

  // 기존 쿼리 무효화
  await Promise.all([
    queryClient.invalidateQueries({
      queryKey: betRoomQuery.roomInfo.queryKey,
      refetchType: "all",
    }),
    queryClient.invalidateQueries({
      queryKey: userInfoQueries.queryKey,
      refetchType: "all",
    }),
  ]);

  // 새로운 데이터 fetch
  const [betRoomInfoData, userInfoData] = await Promise.all([
    queryClient.fetchQuery({
      queryKey: betRoomQuery.roomInfo.queryKey,
      queryFn: betRoomQuery.roomInfo.queryFn,
      staleTime: 0, // 데이터를 즉시 stale 상태로 만듦
      gcTime: 0, // 캐시를 즉시 제거
    }),
    queryClient.fetchQuery({
      queryKey: userInfoQueries.queryKey,
      queryFn: userInfoQueries.queryFn,
      staleTime: 0,
      gcTime: 0,
    }),
  ]);

  const { bettingRoomInfo, userInfo } = loaderTypeGuard(
    betRoomInfoData,
    userInfoData,
  );

  return { roomId, bettingRoomInfo, userInfo };
}
