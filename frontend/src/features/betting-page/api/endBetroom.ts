import { getBettingRoomInfo } from "./getBettingRoomInfo";

async function endBetRoom(
  betroomId: string,
  winningOption: "option1" | "option2",
) {
  const response = await fetch(`/api/betrooms/end/${betroomId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ winning_option: winningOption }),
  });
  if (!response.ok) {
    throw new Error("베팅 룸을 종료하는데 실패했습니다.");
  }

  const bettingRoomInfo = await getBettingRoomInfo(betroomId);
  if (!bettingRoomInfo?.channel.isAdmin) {
    throw new Error("방장만 베팅 룸을 종료할 수 있습니다.");
  }
}

export { endBetRoom };
