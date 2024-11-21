import { VotingStatusCard } from "./VotingStatusCard";
import React from "react";
import { responseBetRoomInfo } from "@betting-duck/shared";
import { z } from "zod";

type WaitingRoomInfo = z.infer<typeof responseBetRoomInfo>;

function WaitingRoomHeader({ roomId }: { roomId: string }) {
  const [channelInfo, setChannelInfo] = React.useState<WaitingRoomInfo>();

  React.useEffect(() => {
    fetch(`/api/betrooms/${roomId}`)
      .then((res) => res.json())
      .then(({ data }) => {
        const result = responseBetRoomInfo.safeParse(data);
        if (!result.success) {
          console.error(result.error.errors);
          return;
        }
        setChannelInfo(result.data);
      });
  }, [roomId]);

  return (
    <div className="flex flex-col items-center justify-center gap-14 p-6">
      <h1 className="text-default text-xl font-extrabold">투표대기창</h1>
      {channelInfo && <VotingStatusCard info={channelInfo} />}
    </div>
  );
}

export { WaitingRoomHeader, type WaitingRoomInfo };
