import { useWaitingContext } from "../../hooks/use-waiting-context";
import { responseBetRoomInfo } from "@betting-duck/shared";
import { z } from "zod";
import React from "react";

function ParticipateButton({
  bettingRoomInfo,
}: {
  bettingRoomInfo: z.infer<typeof responseBetRoomInfo>;
}) {
  const [isBettingStarted, setIsBettingStarted] = React.useState(false);
  const { channel } = bettingRoomInfo;
  const roomId = channel.id;
  const { socket } = useWaitingContext();

  React.useEffect(() => {
    socket.on("startBetting", () => setIsBettingStarted(true));

    return () => {
      socket.off("startBetting");
    };
  }, [socket]);

  async function participateVote() {
    try {
      const response = await fetch(`/api/betrooms/${roomId}`);
      if (!response.ok) throw new Error("방 정보를 가져오는데 실패했습니다.");
      const json = await response.json();
      const { channel } = json.data;

      if (channel.status === "active") {
        window.location.href = `/betting/${roomId}/vote/voting`;
      } else {
        console.error("베팅이 아직 시작되지 않았습니다.");
      }
    } catch (error) {
      console.error("Error during navigation:", error);
    }
  }

  return (
    <button
      disabled={!isBettingStarted}
      onClick={participateVote}
      className="bg-default text-secondary w-full rounded-lg p-[10px] disabled:bg-gray-400"
    >
      참여하기
    </button>
  );
}

export { ParticipateButton };
