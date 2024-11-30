import { useNavigate } from "@tanstack/react-router";
import { useWaitingContext } from "../../hooks/use-waiting-context";
import { responseBetRoomInfo } from "@betting-duck/shared";
import { z } from "zod";

function StartVotingButton({
  bettingRoomInfo,
}: {
  bettingRoomInfo: z.infer<typeof responseBetRoomInfo>;
}) {
  const navigate = useNavigate();
  const { channel } = bettingRoomInfo;
  const roomId = channel.id;
  const { setIsBettingStarted, socket } = useWaitingContext();

  async function startBettingRoom() {
    try {
      const response = await fetch(`/api/betrooms/start/${roomId}`, {
        method: "PATCH",
      });
      if (!response.ok) throw new Error("배팅 시작에 실패했습니다.");
      setIsBettingStarted(true);
      socket.emit("leaveRoom", { roomId });
      navigate({ to: "/betting/$roomId/vote/voting", params: { roomId } });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <button
      onClick={startBettingRoom}
      className="bg-default text-secondary w-full rounded-lg p-[10px]"
    >
      투표 시작
    </button>
  );
}

export { StartVotingButton };
