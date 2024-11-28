import { z } from "zod";
import { getBettingRoomInfo } from "./getBettingRoomInfo";

const responseBetRoomInfo = z.object({
  status: z.enum(["200", "204", "400", "401", "409", "500"]),
  data: z.object({
    bet_room_id: z.string(),
    message: z.string(),
  }),
});

async function endBetRoom(
  betroomId: string,
  winningOption: "option1" | "option2",
) {
  const response = await fetch(`/api/betrooms/end/${betroomId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ winning_option: winningOption }),
  });
  if (!response.ok) {
    throw new Error("베팅 룸을 종료하는데 실패했습니다.");
  }

  const { data } = await response.json();
  const result = responseBetRoomInfo.safeParse(data);
  if (result.error) {
    console.error(result.error);
    throw new Error("베팅 룸을 종료하는데 실패했습니다.");
  }

  const bettingRoomInfo = await getBettingRoomInfo(betroomId);
  if (!bettingRoomInfo?.channel.isAdmin) {
    throw new Error("방장만 베팅 룸을 종료할 수 있습니다.");
  }
}

export { endBetRoom };
