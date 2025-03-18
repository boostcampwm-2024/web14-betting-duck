import { responseBettingRoomInfo } from "../api/responseBettingRoomInfo";

export async function validateRoomAccess(roomId: string) {
  const roomInfo = await responseBettingRoomInfo(roomId);
  if (!roomInfo) throw new Error("방 정보를 불러올 수 없습니다.");
  return roomInfo;
}
