import { useNavigate, useRouter } from "@tanstack/react-router";
import { responseBetRoomInfo } from "@betting-duck/shared";
import { z } from "zod";
import { getBettingRoomInfo } from "@/features/betting-page/api/getBettingRoomInfo";
import React from "react";

function StartVotingButton({
  bettingRoomInfo,
}: {
  bettingRoomInfo: z.infer<typeof responseBetRoomInfo>;
}) {
  const navigate = useNavigate();
  const router = useRouter();
  const { channel } = bettingRoomInfo;
  const roomId = channel.id;
  const [isBettingStart, setIsBettingStart] = React.useState(false);

  async function startBettingRoom() {
    try {
      const bettingRoomInfo = await getBettingRoomInfo(roomId);
      if (!bettingRoomInfo) {
        throw new Error("방 정보를 불러오는데 실패했습니다.");
      }
      if (bettingRoomInfo.channel.status === "active") {
        console.log("배팅이 이미 시작되었습니다.");
        await router.invalidate();
        return navigate({
          to: "/betting/$roomId/vote/admin",
          replace: true,
          params: { roomId },
        });
      }

      const response = await fetch(`/api/betrooms/start/${roomId}`, {
        method: "PATCH",
      });
      if (!response.ok) throw new Error("배팅 시작에 실패했습니다.");
      setIsBettingStart(true);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <button
      disabled={isBettingStart}
      onClick={startBettingRoom}
      className="bg-default text-secondary w-full rounded-lg p-[10px] disabled:bg-gray-400"
    >
      투표 시작
    </button>
  );
}

export { StartVotingButton };
