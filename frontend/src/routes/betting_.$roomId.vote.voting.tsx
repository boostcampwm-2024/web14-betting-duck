import { createFileRoute } from "@tanstack/react-router";
import { BettingPage } from "@/features/betting-page";
import { getBettingRoomInfo } from "@/features/betting-page/api/getBettingRoomInfo";
import { STORAGE_KEY } from "@/features/betting-page/model/var";

export const Route = createFileRoute("/betting_/$roomId/vote/voting")({
  component: BettingPage,
  // beforeLoad: async ({ params }) => {
  //   const { roomId } = params;

  //   const bettingRoomInfo = await getBettingRoomInfo(roomId);

  //   if (bettingRoomInfo?.channel.isAdmin) {
  //     throw redirect({
  //       to: "/betting/$roomId/vote/admin",
  //       params: { roomId },
  //     });
  //   }
  // },
  onLeave: async ({ params }) => {
    const { roomId } = params;
    const bettingRoomInfo = await getBettingRoomInfo(roomId);

    if (bettingRoomInfo?.channel.status !== "active") {
      console.log(bettingRoomInfo);
      return sessionStorage.removeItem(STORAGE_KEY);
    }
  },
});
