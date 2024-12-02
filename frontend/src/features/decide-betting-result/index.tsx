import { DuckCoinIcon } from "@/shared/icons";
import { useBettingContext } from "../betting-page/hook/useBettingContext";
import { calculateWinnings, calculateOdds } from "@/shared/utils/bettingOdds";
import { endBetRoom } from "./api/endBetRoom";
// import { getBettingRoomInfo } from "../betting-page/api/getBettingRoomInfo";
import { useNavigate } from "@tanstack/react-router";
import { useLayoutShift } from "@/shared/hooks/useLayoutShift";

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
  useLayoutShift();
  const { bettingPool, bettingRoomInfo } = useBettingContext();
  const { channel } = bettingRoomInfo;
  const navigate = useNavigate();

  console.log(bettingPool);
  const handleDecideClick = async (option: "option1" | "option2") => {
    try {
      const roomId = channel.id;
      const message = await endBetRoom(roomId, option);
      console.log(message);
      navigate({ to: `/betting/${roomId}/vote/resultDetail` });
    } catch (error) {
      if (error instanceof Error) {
        console.error("API 요청 실패:", error.message);
      } else {
        console.error("알 수 없는 오류 발생");
      }
    }
  };

  return (
    <div
      className={
        "bg-layout-main flex h-full w-full flex-col justify-center gap-10 rounded-lg p-6"
      }
    >
      <h1 className="w-full text-center text-2xl font-bold">
        승리한 팀을 선택 해주세요!
      </h1>
      <div className="flex flex-row items-center">
        <div className="flex w-[50cqw] flex-col items-center gap-6">
          <BettingResult
            uses="winning"
            bettingPool={bettingPool.option1}
            content={channel.options.option1.name}
          />
          <button
            className="bg-bettingBlue hover:bg-bettingBlue-behind hover:text-default text-layout-main w-[40cqw] rounded-lg py-2 hover:font-bold"
            type="submit"
            onClick={() => handleDecideClick("option1")}
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
            className="bg-bettingPink hover:bg-bettingPink-disabled hover:text-default text-layout-main w-[40cqw] rounded-lg py-2 hover:font-bold"
            onClick={() => handleDecideClick("option2")}
          >
            빨간팀의 승리!
          </button>
        </div>
      </div>
    </div>
  );
}
export { DecideBettingResult };
