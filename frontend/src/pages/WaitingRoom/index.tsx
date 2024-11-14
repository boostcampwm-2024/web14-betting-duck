import { WaitingRoomHeader } from "./WaitingRoomHeader";
import { VotingStatusCard } from "./VotingStatusCard";
import { ParticipantsList } from "./ParticipantsList";
import { ShareLinkCard } from "@/feature/waiting-room/shared-link/ui/SharedLinkCard";
import { CancleVottingButton } from "@/feature/waiting-room/cancel-voting/ui/CancleVottingButton";
import { StartVotingButton } from "@/feature/waiting-room/start-voting/ui/StartVotingButton";

function WaitingRoom() {
  return (
    <div className="flex h-full w-full flex-col justify-between py-8">
      <WaitingRoomHeader />
      <section className="flex flex-col gap-6 px-4">
        <VotingStatusCard />
        <ParticipantsList />
        <ShareLinkCard />
      </section>
      <div className="font-nanum-eb flex flex-row gap-4 px-4 text-xl">
        <CancleVottingButton />
        <StartVotingButton />
      </div>
    </div>
  );
}

export { WaitingRoom };
