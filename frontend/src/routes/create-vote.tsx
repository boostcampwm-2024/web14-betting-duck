import { CreateVotePage } from "@/features/create-vote";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { ErrorComponent } from "@/shared/components/Error";
import { CreateVoteError } from "@/features/create-vote/ui/error/CreateVoteError";
import { getSessionItem } from "@/shared/hooks/useSessionStorage";
import { getBettingRoomInfo } from "@/features/betting-page/api/getBettingRoomInfo";
import { ROUTES } from "@/shared/config/route";

export const Route = createFileRoute("/create-vote")({
  component: RouteComponent,
  beforeLoad: async () => {
    let roomId;
    try {
      const sessionUserInfo = await getSessionItem("userInfo");
      const parsedInfo = JSON.parse(sessionUserInfo);
      roomId = parsedInfo?.roomId;

      if (!roomId) {
        return; // roomId가 없으면 조기 반환
      }

      const roomInfo = await getBettingRoomInfo(roomId);
      if (!roomInfo) {
        return; // roomInfo가 없으면 조기 반환
      }

      // 상태에 따른 리다이렉트 처리
      if (roomInfo.channel.status === "waiting") {
        throw redirect({
          to: "/betting/$roomId/waiting",
          params: { roomId },
        });
      }

      if (roomInfo.channel.status === "active") {
        throw redirect({
          to: "/betting/$roomId/vote/voting",
          params: { roomId },
        });
      }

      if (parsedInfo.role === "guest") {
        throw redirect({
          to: "/require-login",
          search: { from: encodeURIComponent(ROUTES.GUEST_CREATE_VOTE) },
        });
      }

      if (
        roomInfo.channel.status === "finished" ||
        roomInfo.channel.status === "timeover"
      ) {
        throw redirect({
          to: "/betting/$roomId/vote/resultDetail",
          params: { roomId },
        });
      }
    } catch (error) {
      if (error instanceof Error && error.name === "RedirectError") {
        throw error; // 리다이렉트는 그대로 throw
      }
      // 그 외의 에러는 무시하고 조기 반환
      return;
    }
  },
  errorComponent: ({ error }) => (
    <ErrorComponent error={error} feature="투표 생성 페이지" to="/login">
      <CreateVoteError />
    </ErrorComponent>
  ),
});

function RouteComponent() {
  return <CreateVotePage />;
}
