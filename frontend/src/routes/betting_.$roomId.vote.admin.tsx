import { BettingPageAdmin } from "@/features/betting-page-admin";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { GlobalErrorComponent } from "@/shared/components/Error/GlobalError";
import { validateRoomAccess } from "@/shared/utils/roomValidation";

export const Route = createFileRoute("/betting_/$roomId/vote/admin")({
  component: BettingPageAdmin,
  beforeLoad: async ({ params }) => {
    const { roomId } = params;
    const roomInfo = await validateRoomAccess(roomId);

    if (!roomInfo.channel.isAdmin) {
      throw redirect({
        to: `/betting/${roomId}/vote/voting`,
      });
    }

    return { roomInfo };
  },

  shouldReload: () => false,
  errorComponent: ({ error }) => {
    return <GlobalErrorComponent error={error} to="/" />;
  },
});
