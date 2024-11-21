import { VotingStatusCard } from "./VotingStatusCard";

function WaitingRoomHeader() {
  return (
    <div className="flex flex-col items-center justify-center gap-14 p-6">
      <h1 className="text-default text-xl font-extrabold">투표대기창</h1>
      <VotingStatusCard />
    </div>
  );
}

export { WaitingRoomHeader };
