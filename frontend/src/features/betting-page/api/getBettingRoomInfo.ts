import { responseBetRoomInfo } from "@betting-duck/shared";

async function getBettingRoomInfo(roomId: string) {
  try {
    const response = await fetch(`/api/betrooms/${roomId}`);
    if (!response.ok) {
      return null; // 에러 대신 null 반환
    }

    const { data } = await response.json();
    const result = responseBetRoomInfo.safeParse(data);
    if (!result.success) {
      return null; // 파싱 실패시에도 null 반환
    }
    return result.data;
  } catch {
    return null; // 네트워크 에러 등의 경우에도 null 반환
  }
}

export { getBettingRoomInfo };
