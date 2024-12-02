import { responseBetRoomInfo } from "@betting-duck/shared";
import { EnsureQueryDataOptions } from "@tanstack/react-query";
import { z } from "zod";

interface BetRoomInfo {
  roomInfo: EnsureQueryDataOptions;
}
const StringSchema = z.string();

async function responseBettingRoomInfo(roomId: string) {
  try {
    const response = await fetch(`/api/betrooms/${roomId}`);
    if (!response.ok) {
      throw new Error("배팅 방 정보를 불러오는데 실패했습니다.");
    }

    const { data } = await response.json();
    const result = responseBetRoomInfo.safeParse(data);
    if (!result.success) {
      console.error(result.error.errors);
      throw new Error("배팅 방 정보를 파싱하는데 실패했습니다.");
    }
    return result.data;
  } catch (error) {
    console.error(error);
  }
}

const betRoomQueries = (roomId: string): BetRoomInfo => ({
  roomInfo: {
    queryKey: ["betRoom", "info", roomId],
    queryFn: async ({ queryKey }) => {
      const [, , roomId] = queryKey;
      const parsedRoomId = StringSchema.safeParse(roomId);
      if (!parsedRoomId.success) {
        throw new Error("배팅 방 정보를 불러오는데 실패");
      }
      return await responseBettingRoomInfo(parsedRoomId.data);
    },
  },
});

export { responseBettingRoomInfo, betRoomQueries };
