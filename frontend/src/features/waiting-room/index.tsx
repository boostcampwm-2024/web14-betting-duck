import { WaitingRoomHeader } from "./ui/WaitingRoomHeader";
import { ParticipantsList } from "./ui/ParticipantsList";
import { ShareLinkCard } from "@/features/waiting-room/ui/SharedLinkCard";
import { AdminFooter } from "./ui/AdminFooter";
import { MemberFooter } from "./ui/MemberFooter";
import { useUserContext } from "@/shared/hooks/useUserContext";
import { WaitingRoomProvider } from "./provider/WaitingRoomProvider";
import React from "react";
import { useLoaderData } from "@tanstack/react-router";
import { useEffectOnce } from "@/shared/hooks/useEffectOnce";

function WaitingRoom() {
  const { userInfo, setUserInfo } = useUserContext();
  const { roomId, bettingRoomInfo } = useLoaderData({
    from: "/betting_/$roomId/waiting",
  });
  const firstRendering = React.useRef(true);

  useEffectOnce(() => {
    if (firstRendering.current) {
      setUserInfo({ roomId });
      firstRendering.current = false;
      return;
    }
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
            <MemberFooter />
          )}
        </div>
      </div>
    </WaitingRoomProvider>
  );
}

export { WaitingRoom };
