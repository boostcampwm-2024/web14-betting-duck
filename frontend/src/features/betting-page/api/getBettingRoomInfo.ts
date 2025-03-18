import { responseBetRoomInfo } from "@betting-duck/shared";

async function getBettingRoomInfo(roomId: string) {
  if (!roomId) return null;
  try {
    const response = await fetch(`/api/betrooms/${roomId}`);
    if (!response.ok) {
      return null;
    }

    const { data } = await response.json();
    const result = responseBetRoomInfo.safeParse(data);
    if (!result.success) {
      return null;
    }
    return {
      ...result.data,
      isPlaceBet: false,
      placeBetAmount: 0,
    };
  } catch {
    return null;
  }
}

export { getBettingRoomInfo };
