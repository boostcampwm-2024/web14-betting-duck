import { DuckCoinIcon } from "@/shared/icons";
import { cn } from "@/shared/misc";
import { useBettingContext } from "../betting-page/hook/useBettingContext";

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
  const color = uses === "winning" ? "text-bettingBlue" : "text-bettingPink";

  return (
    <div className={`flex flex-col items-center justify-center ${color}`}>
      <DuckCoinIcon />
      <div className="flex flex-col items-center pt-4">
        <p className="text-2xl font-extrabold">{content}</p>
        <div className="flex flex-row gap-2">
          <DuckCoinIcon width={36} height={36} />
          <span className="text-xl font-extrabold">
            {bettingPool.totalAmount}!
          </span>
        </div>
      </div>
      <div className="text-default-disabled text-md text-pretty break-all">
        <span>
          {bettingPool.participants} 명에게{" "}
          <DuckCoinIcon width={16} height={16} className="inline-block" />{" "}
          {bettingPool.totalAmount} 포인트를 드립니다
        </span>
      </div>
    </div>
  );
}

function DecideBettingResult() {
  const { bettingPool, bettingRoomInfo } = useBettingContext();
  const { channel } = bettingRoomInfo;

  return (
    <form
      className={cn(
        "betting-container",
        "shadow-middle bg-layout-main h-full max-h-[430px] w-full min-w-[630px] rounded-lg border-2 p-6",
      )}
    >
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
            type="submit"
          >
            빨간팀의 승리!
          </button>
        </div>
      </div>
    </form>
  );
}
export { DecideBettingResult };
