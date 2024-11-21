import { WaitingRoomHeader } from "./ui/WaitingRoomHeader";
import { ParticipantsList } from "./ui/ParticipantsList";
import { ShareLinkCard } from "@/features/waiting-room/ui/SharedLinkCard";
import { AdminFooter } from "./ui/AdminFooter";
import { MemberFooter } from "./ui/MemberFooter";
import { useLoaderData } from "@tanstack/react-router";
import { useUser } from "@/shared/hooks/use-user";

function WaitingRoom() {
  const { userInfo } = useUser();
  const { roomId } = useLoaderData({ from: "/voting_/$roomId/waiting" });

  return (
    <div className="bg-layout-main flex h-full w-full flex-col justify-between pb-16 pt-8">
      <WaitingRoomHeader roomId={roomId} />
      <section className="flex flex-col gap-6 px-4">
        <ParticipantsList roomId={roomId} />
        <ShareLinkCard />
      </section>
      <div className="flex flex-row gap-4 px-4 text-lg font-extrabold">
        {userInfo.role === "admin" ? <AdminFooter /> : <MemberFooter />}
      </div>
    </div>
  );
}

export { WaitingRoom };
