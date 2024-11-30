import { DuckCoinIcon } from "@/shared/icons";
import { Route } from "@/routes/betting_.$roomId.vote.voting";
import { useBettingContext } from "../hook/useBettingContext";

function BettingFooter() {
  const { bettingPool } = useBettingContext();
  const { userInfo } = Route.useLoaderData();
  const { duck } = userInfo;
  const { placeBetAmount } = bettingPool;

  return (
    <div className="flex items-center justify-between gap-2 px-4 pt-4 text-center font-bold text-gray-600">
      <div className="flex items-center gap-2">
        배팅 금액:{" "}
        <span className="flex items-center gap-2 font-extrabold">
          <DuckCoinIcon width={26} height={26} />
          {placeBetAmount ?? 0}
        </span>
      </div>
      <div className="flex items-center gap-2">
        소유 금액:{" "}
        <span className="flex items-center gap-2 font-extrabold">
          <DuckCoinIcon width={26} height={26} />
          {duck - (placeBetAmount ?? 0)}
        </span>
      </div>
    </div>
  );
}

export { BettingFooter };
