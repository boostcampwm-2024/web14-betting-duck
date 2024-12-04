import { WaitingRoomHeader } from "./ui/WaitingRoomHeader";
import { ParticipantsList } from "./ui/ParticipantsList";
import { ShareLinkCard } from "@/features/waiting-room/ui/SharedLinkCard";
import { AdminFooter } from "./ui/AdminFooter";
import { MemberFooter } from "./ui/MemberFooter";
import { useUserContext } from "@/shared/hooks/useUserContext";
import { WaitingRoomProvider } from "./provider/WaitingRoomProvider";
import { useLoaderData } from "@tanstack/react-router";

function WaitingRoom() {
  const { userInfo } = useUserContext();
  const { bettingRoomInfo } = useLoaderData({
    from: "/betting_/$roomId/waiting",
  });

  return (
    <WaitingRoomProvider>
      <div className="bg-layout-main flex h-full w-full flex-col justify-around">
        <WaitingRoomHeader />
        <section className="flex flex-col gap-6 px-4">
          <ParticipantsList />
          <ShareLinkCard />
        </section>
        <div className="flex flex-row gap-4 px-4 text-lg font-extrabold">
          {userInfo.role === "admin" ? (
            <AdminFooter bettingRoomInfo={bettingRoomInfo} />
          ) : (
            <MemberFooter bettingRoomInfo={bettingRoomInfo} />
          )}
        </div>
      </div>
    </WaitingRoomProvider>
  );
}

export { WaitingRoom };
