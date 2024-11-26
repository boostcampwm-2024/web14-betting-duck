import React from "react";
import { DuckCoinIcon, PeoplesIcon, TrophyIcon } from "@/shared/icons";

interface BettingStats {
  participants: number;
  totalAmount: number;
  multiplier: number;
  returnRate: number;
}

const BettingStatsDisplay = React.memo(
  ({
    stats,
    content,
    uses,
  }: {
    stats: BettingStats;
    content: string;
    uses: "winning" | "losing";
  }) => {
    const color = uses === "winning" ? "text-bettingBlue" : "text-bettingPink";

    const bettingStats = React.useMemo(
      () => [
        { icon: DuckCoinIcon, alt: "코인 아이콘", stat: stats.totalAmount },
        { icon: TrophyIcon, alt: "트로피 아이콘", stat: stats.multiplier },
        {
          icon: PeoplesIcon,
          alt: "참여자 수 아이콘",
          stat: stats.participants,
        },
      ],
      [stats],
    );

    return (
      <div className={`flex flex-1 flex-row justify-between ${color}`}>
        <div className="text-md flex max-w-[25cqw] flex-col gap-2">
          {bettingStats.map(({ icon: Icon, alt, stat }) => (
            <div
              key={alt}
              className="flex items-center justify-between gap-4 space-x-1 text-center text-lg"
            >
              <Icon width={24} height={24} />
              <span className="h-[24px]">{stat}</span>
            </div>
          ))}
        </div>
        <div className="group relative mt-auto w-full max-w-[25cqw] truncate text-end text-2xl font-extrabold">
          {content}
        </div>
      </div>
    );
  },
);

export { BettingStatsDisplay };
