import { CreateVotePage } from "@/features/create-vote";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { ErrorComponent } from "@/shared/components/Error";
import { CreateVoteError } from "@/features/create-vote/ui/error/CreateVoteError";
import { getSessionItem } from "@/shared/hooks/useSessionStorage";
import { getBettingRoomInfo } from "@/features/betting-page/api/getBettingRoomInfo";
import { ROUTES } from "@/shared/config/route";
import { ProtectedRoute } from "@/shared/components/ProtectedRoute";

type RoomInfo = Awaited<ReturnType<typeof getBettingRoomInfo>>;

function redirectWaitingRoom(roomInfo: RoomInfo, roomId: string) {
  if (roomInfo?.channel.status === "waiting") {
    return redirect({
      to: "/betting/$roomId/waiting",
      params: { roomId },
    });
  }
}

function redirectVoting(roomInfo: RoomInfo, roomId: string) {
  if (roomInfo?.channel.status === "active") {
    return redirect({
      to: "/betting/$roomId/vote/voting",
      params: { roomId },
    });
  }
}

function redirectGuest(role: string) {
  if (role === "guest") {
    return redirect({
      to: "/require-login",
      search: { from: encodeURIComponent(ROUTES.GUEST_CREATE_VOTE) },
    });
  }
}

function redirectFinished(roomInfo: RoomInfo, roomId: string) {
  if (
    roomInfo?.channel.status === "finished" ||
    roomInfo?.channel.status === "timeover"
  ) {
    return redirect({
      to: "/betting/$roomId/vote/resultDetail",
      params: { roomId },
    });
  }
}

export const Route = createFileRoute("/create-vote")({
  component: RouteComponent,
  beforeLoad: async () => {
    let roomId;
    try {
      const sessionUserInfo = await getSessionItem("userInfo");
      const parsedInfo = JSON.parse(sessionUserInfo);
      roomId = parsedInfo?.roomId;
      const roomInfo = await getBettingRoomInfo(roomId);
      if (!roomId) {
        return;
      }

      if (!roomInfo) {
        return;
      }

      redirectWaitingRoom(roomInfo, roomId);
      redirectVoting(roomInfo, roomId);
      redirectGuest(parsedInfo.role);
      redirectFinished(roomInfo, roomId);
    } catch (error) {
      if (error instanceof Error && error.name === "RedirectError") {
        throw error;
      }
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
  return (
    <ProtectedRoute>
      <CreateVotePage />;
    </ProtectedRoute>
  );
}
