import { DuckCoinIcon } from "@/shared/icons";
import React from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { authQueries } from "@/shared/lib/auth/authQuery";
import { BettingRoomInfo } from "@/shared/types";

function BettingFooter({
  bettingRoomInfo,
}: {
  bettingRoomInfo: BettingRoomInfo;
}) {
  const { data: authData } = useSuspenseQuery({
    queryKey: authQueries.queryKey,
    queryFn: authQueries.queryFn,
  });
  const duckCoin = authData.userInfo.duck;

  const remainingAmount = React.useMemo(
    () => duckCoin - bettingRoomInfo.placeBetAmount,
    [duckCoin, bettingRoomInfo.placeBetAmount],
  );

  return (
    <div className="flex items-center justify-between gap-2 px-4 pt-4 text-center font-bold text-gray-600">
      <div className="flex items-center gap-2">
        배팅 금액:{" "}
        <span className="flex items-center gap-2 font-extrabold">
          <DuckCoinIcon width={26} height={26} />
          {bettingRoomInfo.placeBetAmount}
        </span>
      </div>
      <div className="flex items-center gap-2">
        소유 금액:{" "}
        <span className="flex items-center gap-2 font-extrabold">
          <DuckCoinIcon width={26} height={26} />
          {remainingAmount}
        </span>
      </div>
    </div>
  );
}

export { BettingFooter };
