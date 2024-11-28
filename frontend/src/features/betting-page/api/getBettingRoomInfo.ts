import { responseBetRoomInfo } from "@betting-duck/shared";

async function getBettingRoomInfo(roomId: string) {
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

export { getBettingRoomInfo };
