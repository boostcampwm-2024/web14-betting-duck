import { useNavigate } from "@tanstack/react-router";
import { useWaitingContext } from "../../hooks/use-waiting-context";
import { responseBetRoomInfo } from "@betting-duck/shared";
import { z } from "zod";
import { getBettingRoomInfo } from "@/features/betting-page/api/getBettingRoomInfo";

function StartVotingButton({
  bettingRoomInfo,
}: {
  bettingRoomInfo: z.infer<typeof responseBetRoomInfo>;
}) {
  const navigate = useNavigate();
  const { channel } = bettingRoomInfo;
  const roomId = channel.id;
  const { setIsBettingStarted } = useWaitingContext();

  async function startBettingRoom() {
    try {
      const bettingRoomInfo = await getBettingRoomInfo(roomId);
      if (!bettingRoomInfo) {
        throw new Error("방 정보를 불러오는데 실패했습니다.");
      }
      if (bettingRoomInfo.channel.status === "active") {
        console.log("배팅이 이미 시작되었습니다.");
        return navigate({
          to: "/betting/$roomId/vote/admin",
          params: { roomId },
        });
      }

      const response = await fetch(`/api/betrooms/start/${roomId}`, {
        method: "PATCH",
      });
      if (!response.ok) throw new Error("배팅 시작에 실패했습니다.");
      setIsBettingStarted(true);
      navigate({ to: "/betting/$roomId/vote/admin", params: { roomId } });
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
