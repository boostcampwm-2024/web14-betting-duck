import { DuckCoinIcon } from "@/shared/icons";
import { Route } from "@/routes/betting_.$roomId.vote.voting";
import React from "react";
import { z } from "zod";
import { userBettingStatusSchema } from "../model/schema";

function BettingFooter({
  userBettingStatus,
}: {
  userBettingStatus: z.infer<typeof userBettingStatusSchema>;
}) {
  const { userInfo } = Route.useLoaderData();
  const { duck } = userInfo;

  const currentAmount = React.useMemo(
    () => userBettingStatus.betAmount ?? 0,
    [userBettingStatus.betAmount],
  );

  const remainingAmount = React.useMemo(
    () => duck - currentAmount,
    [duck, currentAmount],
  );

  return (
    <div className="flex items-center justify-between gap-2 px-4 pt-4 text-center font-bold text-gray-600">
      <div className="flex items-center gap-2">
        베팅 금액:{" "}
        <span className="flex items-center gap-2 font-extrabold">
          <DuckCoinIcon width={26} height={26} />
          {currentAmount}
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
