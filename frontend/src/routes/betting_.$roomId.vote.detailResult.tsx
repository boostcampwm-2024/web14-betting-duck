import { createFileRoute } from "@tanstack/react-router";
import { PredictDetail } from "@/features/predict-detail";
// import { getBettingRoomInfo } from "@/features/betting-page/api/getBettingRoomInfo";

export const Route = createFileRoute("/betting_/$roomId/vote/detailResult")({
  component: PredictDetail,
  // loader: async ({ params }) => {
  //   // const { roomId } = params;
  //   // const bettingRoomInfo = await getBettingRoomInfo(roomId);

  //   // if (bettingRoomInfo?.channel.status !== "finished") {
  //   //   throw redirect({
  //   //     to: `/betting/${roomId}/vote/voting`,
  //   //   });
  //   // }
  // },
});
