import { cn } from "@/shared/misc";
import { BettingHeader } from "./BettingHeader";
import { BettingStatsDisplay } from "./BettingStatsDisplay";
import { PercentageDisplay } from "./PercentageDisplay";
import { useBettingContext } from "../hook/useBettingContext";
import { BettingFooter } from "./BettingFooter";
import { useBettingConnection } from "../hook/useBettingRoomConnection";
import { useBettingRoomInfo } from "../hook/useBettingRoomInfo";
import { BettingInput } from "./BettingInput";

function BettingContainer() {
  const contextValue = useBettingContext();
  const {
    socket,
    bettingRoomInfo,
    bettingPool,
    updateBettingPool,
    bettingSummary,
  } = contextValue;
  const { channel } = bettingRoomInfo;

  useBettingConnection(socket, bettingRoomInfo);
  useBettingRoomInfo({
    socket,
    bettingRoomInfo,
    bettingPool,
    updateBettingPool,
  });

  return (
    <div
      className={cn(
        "betting-container",
        "bg-layout-main h-full min-w-[70cqw] p-6",
      )}
    >
      <button
        onClick={() =>
          socket.emit("joinBet", {
            sender: {
              betAmount: 300,
              selectOption: "option1", // enum option1, option2
            },
            channel: {
              roomId: bettingRoomInfo.channel.id,
            },
          })
        }
      >
        ㅇㅇ
      </button>
      <div className="flex h-full flex-col">
        <BettingHeader content={channel.title} contextValue={contextValue} />
        <div className="flex w-full">
          <div className="flex justify-between">
            <BettingStatsDisplay
              stats={bettingSummary.option1}
              content={channel.options.option1.name}
              uses="winning"
            >
              <PercentageDisplay
                index={0}
                percentage={parseInt(bettingSummary.option1Percentage)}
              />
            </BettingStatsDisplay>
          </div>
          <div className="flex flex-col gap-6">
            <BettingStatsDisplay
              stats={bettingSummary.option2}
              content={channel.options.option2.name}
              uses="losing"
            >
              <PercentageDisplay
                index={1}
                percentage={parseInt(bettingSummary.option2Percentage)}
              />
            </BettingStatsDisplay>
          </div>
          {/* <BettingForm /> */}
        </div>
        <div className="flex">
          <BettingInput uses={"winning"} />
          <BettingInput uses={"losing"} />
        </div>
        <BettingFooter />
      </div>
    </div>
  );
}

export { BettingContainer };
