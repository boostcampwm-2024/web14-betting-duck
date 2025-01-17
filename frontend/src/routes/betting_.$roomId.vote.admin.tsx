import { BettingPageAdmin } from "@/features/betting-page-admin";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { getBettingRoomInfo } from "@/features/betting-page/api/getBettingRoomInfo";
import { GlobalErrorComponent } from "@/shared/components/Error/GlobalError";

export const Route = createFileRoute("/betting_/$roomId/vote/admin")({
  component: BettingPageAdmin,
  beforeLoad: async ({ params }) => {
    const { roomId } = params;
    const roomInfo = await getBettingRoomInfo(roomId);
    if (!roomInfo) {
      throw new Error("방 정보를 불러오는데 실패했습니다.");
    }

    if (!roomInfo.channel.isAdmin) {
      throw redirect({
        to: `/betting/${roomId}/vote/voting`,
      });
    }
  },

  shouldReload: () => true,
  errorComponent: ({ error }) => {
    return <GlobalErrorComponent error={error} to="/" />;
  },
});
