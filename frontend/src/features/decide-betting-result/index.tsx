import { DuckCoinIcon } from "@/shared/icons";
import { useBettingContext } from "../betting-page/hook/useBettingContext";
import { calculateWinnings, calculateOdds } from "@/shared/utils/bettingOdds";
import { endBetRoom } from "../betting-page/api/endBetroom";
import { getBettingRoomInfo } from "../betting-page/api/getBettingRoomInfo";

interface BettingPool {
  totalAmount: number;
  participants: number;
}

function BettingResult({
  content,
  bettingPool,
  uses,
}: {
  content: string;
  bettingPool: BettingPool;
  uses: "winning" | "losing";
}) {
  const { bettingPool: totalPool } = useBettingContext();

  const calculatePayout = () => {
    if (bettingPool.participants === 0) {
      return {
        totalPayout: 0,
        averagePayout: 0,
      };
    }

    const odds = calculateOdds({
      option1: {
        totalAmount: totalPool.option1.totalAmount,
        participants: totalPool.option1.participants,
      },
      option2: {
        totalAmount: totalPool.option2.totalAmount,
        participants: totalPool.option2.participants,
      },
    });

    const multiplier =
      uses === "winning" ? odds.option1Multiplier : odds.option2Multiplier;
    const averagePayout = calculateWinnings(
      bettingPool.participants > 0
        ? bettingPool.totalAmount / bettingPool.participants
        : 0,
      multiplier,
    );

    return {
      totalPayout: averagePayout * bettingPool.participants,
      averagePayout,
    };
  };

  const { totalPayout, averagePayout } = calculatePayout();
  const color = uses === "winning" ? "text-bettingBlue" : "text-bettingPink";

  return (
    <div className={`flex flex-col items-center justify-center ${color}`}>
      <DuckCoinIcon />
      <div className="flex flex-col items-center pt-4">
        <p className="text-2xl font-extrabold">{content}</p>
        <div className="flex flex-row gap-2">
          <DuckCoinIcon width={36} height={36} />
          <span className="text-xl font-extrabold">{totalPayout || 0}</span>
        </div>
      </div>
      <div className="text-default-disabled text-md text-pretty break-all">
        <span>
          {bettingPool.participants === 0 ? (
            "베팅한 참가자가 없습니다"
          ) : (
            <>
              {bettingPool.participants} 명에게 평균{" "}
              <DuckCoinIcon width={16} height={16} className="inline-block" />{" "}
              {averagePayout || 0} 포인트씩, 총 {totalPayout || 0} 포인트를
              드립니다
            </>
          )}
        </span>
      </div>
    </div>
  );
}

function DecideBettingResult() {
  const { bettingPool, bettingRoomInfo } = useBettingContext();
  const { channel } = bettingRoomInfo;

  return (
    <div className={"bg-layout-main h-full w-full rounded-lg p-6"}>
      <button
        onClick={async () => {
          const a = await getBettingRoomInfo(channel.id);
          console.log(a);
        }}
      >
        dd
      </button>
      <h1 className="w-full text-center text-lg font-bold">
        승리한 팀을 선택 해주세요!
      </h1>
      <div className="flex h-full flex-row items-center">
        <div className="flex w-[50cqw] flex-col items-center gap-6">
          <BettingResult
            uses="winning"
            bettingPool={bettingPool.option1}
            content={channel.options.option1.name}
          />
          <button
            className="bg-bettingBlue text-layout-main w-[40cqw] rounded-lg py-2"
            type="submit"
            onClick={() => endBetRoom(channel.id, "option1")}
          >
            파란팀의 승리!
          </button>
        </div>
        <div className="flex w-[50cqw] flex-col items-center gap-6">
          <BettingResult
            uses="losing"
            bettingPool={bettingPool.option2}
            content={channel.options.option2.name}
          />
          <button
            className="bg-bettingPink text-layout-main w-[40cqw] rounded-lg py-2"
            onClick={() => endBetRoom(channel.id, "option2")}
          >
            빨간팀의 승리!
          </button>
        </div>
      </div>
    </div>
  );
}
export { DecideBettingResult };
