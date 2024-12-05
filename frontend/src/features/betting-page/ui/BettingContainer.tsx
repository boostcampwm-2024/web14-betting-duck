import { cn } from "@/shared/misc";
import { useSocketIO } from "@/shared/hooks/useSocketIo";
import { TotalBettingDisplay } from "./TotalBettingDisplay";
import { BettingHeader } from "./BettingHeader";
import { BettingInput } from "./BettingInput";
import { BettingFooter } from "./BettingFooter";
import { BettingRoomInfo } from "@/shared/types";

function BettingContainer({
  socket,
  bettingRoomInfo,
}: {
  socket: ReturnType<typeof useSocketIO>;
  bettingRoomInfo: BettingRoomInfo;
}) {
  const { channel } = bettingRoomInfo;

  return (
    <div
      className={cn(
        "betting-container",
        "bg-layout-main h-full min-w-[70cqw] p-6",
      )}
    >
      <div className="flex h-full flex-col justify-around">
        <BettingHeader socket={socket} content={channel.title} />
        <TotalBettingDisplay socket={socket} channel={channel} />
        <div className="flex justify-around">
          <BettingInput
            key={"winning-betting-input"}
            uses={"winning"}
            bettingRoomInfo={bettingRoomInfo}
          />
          <BettingInput
            key={"losing-betting-input"}
            uses={"losing"}
            bettingRoomInfo={bettingRoomInfo}
          />
        </div>
        <BettingFooter bettingRoomInfo={bettingRoomInfo} />
      </div>
    </div>
  );
}

export { BettingContainer };
