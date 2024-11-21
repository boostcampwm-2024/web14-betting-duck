import { WaitingRoomHeader } from "./ui/WaitingRoomHeader";
import { ParticipantsList } from "./ui/ParticipantsList";
import { ShareLinkCard } from "@/features/waiting-room/ui/SharedLinkCard";
import { AdminFooter } from "./ui/AdminFooter";
import React from "react";
// import { MemberFooter } from "./ui/MemberFooter";

function WaitingRoom() {
  React.useEffect(() => {
    fetch("/api/users/token")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <div className="bg-layout-main flex h-full w-full flex-col justify-between pb-16 pt-8">
      <WaitingRoomHeader />
      <section className="flex flex-col gap-6 px-4">
        <ParticipantsList />
        <ShareLinkCard />
      </section>
      <div className="flex flex-row gap-4 px-4 text-lg font-extrabold">
        <AdminFooter />
      </div>
    </div>
  );
}

export { WaitingRoom };
