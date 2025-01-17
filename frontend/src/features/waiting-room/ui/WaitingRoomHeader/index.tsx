import { VotingStatusCard } from "./VotingStatusCard";
import { responseBetRoomInfo } from "@betting-duck/shared";
import { z } from "zod";

type WaitingRoomInfo = z.infer<typeof responseBetRoomInfo>;

function WaitingRoomHeader({
  bettingRoomInfo,
}: {
  bettingRoomInfo: z.infer<typeof responseBetRoomInfo>;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-14 p-6">
      <h1 className="text-default text-xl font-extrabold">투표대기창</h1>
      <VotingStatusCard bettingRoomInfo={bettingRoomInfo} />
    </div>
  );
}

export { WaitingRoomHeader, type WaitingRoomInfo };
