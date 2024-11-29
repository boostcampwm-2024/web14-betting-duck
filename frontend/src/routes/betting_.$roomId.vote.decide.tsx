import { createFileRoute, redirect } from "@tanstack/react-router";
import { DecideBettingResult } from "@/features/decide-betting-result";
import { validateAccess } from "@/shared/lib/validateAccess";
import { getBettingRoomInfo } from "@/features/betting-page/api/getBettingRoomInfo";

export const Route = createFileRoute("/betting_/$roomId/vote/decide")({
  component: DecideBettingResult,
  loader: async ({ params }) => {
    const { roomId } = params;

    const abortController = new AbortController();
    await validateAccess(roomId, abortController.signal);
    const bettingRoomInfo = await getBettingRoomInfo(roomId);
    if (!bettingRoomInfo) {
      throw new Error("베팅 룸 데이터를 불러오는데 실패했습니다.");
    }

    console.log(bettingRoomInfo);
    if (bettingRoomInfo.channel.status !== "timeover") {
      throw redirect({
        to: `/betting/${roomId}/vote/voting`,
      });
    }

    return { roomId, bettingRoomInfo };
  },
});
