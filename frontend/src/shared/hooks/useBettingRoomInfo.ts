import { useQuery } from "@tanstack/react-query";
import { betRoomQueries } from "../api/responseBettingRoomInfo";
import { z } from "zod";

const StringSchema = z.string();

export function useBettingRoomInfo(roomId: string) {
  const parsedRoomId = StringSchema.safeParse(roomId);
  if (!parsedRoomId.success) {
    throw new Error("배팅 방 정보를 불러오는데 실패");
  }
  const { roomInfo } = betRoomQueries(parsedRoomId.data);
  return useQuery({
    queryKey: roomInfo.queryKey,
    queryFn: roomInfo.queryFn,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}
