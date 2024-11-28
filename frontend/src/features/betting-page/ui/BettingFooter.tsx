import { useUserContext } from "@/shared/hooks/useUserContext";
import { DuckCoinIcon } from "@/shared/icons";
import { Route } from "@/routes/betting_.$roomId.vote";
import React from "react";

function BettingFooter() {
  const { userInfo } = useUserContext();
  const { duckCoin } = Route.useLoaderData();
  const [currentDuckCoin, setCurrentDuckCoin] = React.useState(duckCoin);

  React.useEffect(() => {
    setCurrentDuckCoin(duckCoin - (userInfo.placeBetAmount ?? 0));
  }, [userInfo.placeBetAmount, duckCoin]);

  return (
    <div className="flex items-center justify-between gap-2 px-4 pt-4 text-center font-bold text-gray-600">
      <div className="flex items-center gap-2">
        배팅 금액:{" "}
        <span className="flex items-center gap-2 font-extrabold">
          <DuckCoinIcon width={26} height={26} />
          {userInfo.placeBetAmount ?? 0}
        </span>
      </div>
      <div className="flex items-center gap-2">
        소유 금액:{" "}
        <span className="flex items-center gap-2 font-extrabold">
          <DuckCoinIcon width={26} height={26} />
          {currentDuckCoin}
        </span>
      </div>
    </div>
  );
}

export { BettingFooter };
