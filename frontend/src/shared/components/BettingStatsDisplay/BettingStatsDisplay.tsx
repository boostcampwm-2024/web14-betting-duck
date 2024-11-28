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
    children,
  }: {
    stats: BettingStats;
    content: string;
    uses: "winning" | "losing";
    children?: React.ReactNode;
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
      <div
        className={`flex flex-1 flex-row justify-between pl-8 pr-4 ${color}`}
      >
        <div className="text-md flex max-w-[35cqw] flex-col gap-2">
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
        <div className="group relative mt-auto flex w-full max-w-[30cqw] flex-col items-end truncate text-end text-2xl font-extrabold">
          {content}
          {children}
        </div>
      </div>
    );
  },
);

export { BettingStatsDisplay };
