import { WaitingRoomHeader } from "./ui/WaitingRoomHeader";
import { ParticipantsList } from "./ui/ParticipantsList";
import { ShareLinkCard } from "@/features/waiting-room/ui/SharedLinkCard";
import { AdminFooter } from "./ui/AdminFooter";
import { MemberFooter } from "./ui/MemberFooter";
import { WaitingRoomProvider } from "./provider/WaitingRoomProvider";
import { useParams } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { bettingRoomQueryKey } from "@/shared/lib/bettingRoomInfo";
import { getBettingRoomInfo } from "../betting-page/api/getBettingRoomInfo";
import { BettingRoomInfoSchema } from "@/shared/types";

function WaitingRoom() {
  const { roomId } = useParams({
    from: "/betting_/$roomId/waiting",
  });
  const { data } = useSuspenseQuery({
    queryKey: bettingRoomQueryKey(roomId),
    queryFn: () => getBettingRoomInfo(roomId),
  });
  const parsedData = BettingRoomInfoSchema.safeParse(data);
  if (!parsedData.success) {
    throw new Error("방 정보를 불러오는데 실패했습니다.");
  }

  return (
    <WaitingRoomProvider>
      <div className="bg-layout-main flex h-full w-full flex-col justify-around">
        <WaitingRoomHeader bettingRoomInfo={parsedData.data} />
        <section className="flex flex-col gap-6 px-4">
          <ParticipantsList />
          <ShareLinkCard />
        </section>
        <div className="flex flex-row gap-4 px-4 text-lg font-extrabold">
          {parsedData.data.channel.isAdmin ? (
            <AdminFooter bettingRoomInfo={parsedData.data} />
          ) : (
            <MemberFooter bettingRoomInfo={parsedData.data} />
          )}
        </div>
      </div>
    </WaitingRoomProvider>
  );
}

export { WaitingRoom };
