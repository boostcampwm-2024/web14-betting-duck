import React from "react";
import { DuckCoinIcon, PeoplesIcon, TrophyIcon } from "@/shared/icons";
import { cn } from "@/shared/misc";

interface BettingStats {
  participants: number;
  totalAmount: number;
  multiplier: number;
  returnRate: number;
}

interface BettingStatsDisplayProps
  extends React.HTMLAttributes<HTMLDivElement> {
  stats: BettingStats;
  content: string;
  uses: "winning" | "losing";
  children?: React.ReactNode;
}

const BettingStatsDisplay = React.memo(
  ({ stats, content, uses, children, ...props }: BettingStatsDisplayProps) => {
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
        className={cn(
          `flex flex-1 flex-row justify-between ${color}`,
          props.className,
        )}
      >
        <div className="text-md flex w-full max-w-[18cqw] flex-col gap-2">
          {bettingStats.map(({ icon: Icon, alt, stat }) => (
            <div
              key={alt}
              className="flex items-center justify-between gap-4 text-center text-lg"
            >
              <Icon className="flex-shrink-0" width={24} height={24} />
              <div className="min-w-0 flex-1">
                <span className="block truncate text-end text-lg font-bold">
                  {stat}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="group relative mt-auto flex w-full max-w-[30cqw] flex-col items-end truncate text-end text-2xl font-extrabold">
          <div className="w-full truncate pl-4 text-end text-2xl font-extrabold">
            {content}
          </div>
          {children}
        </div>
      </div>
    );
  },
);

export { BettingStatsDisplay };
