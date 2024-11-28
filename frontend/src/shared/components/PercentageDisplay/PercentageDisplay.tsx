import { ProgressBar } from "@/shared/components/ProgressBar";

import React from "react";

const PercentageDisplay = React.memo(function PercentageDisplay({
  percentage,
  index,
}: {
  percentage: number;
  index: number;
}) {
  return (
    <div className="flex w-full max-w-[30cqw] flex-col items-end">
      <span
        className={`text-2xl font-extrabold ${
          index === 0 ? "text-bettingBlue" : "text-bettingPink"
        }`}
      >
        {percentage}%
      </span>
      <ProgressBar
        value={percentage}
        uses={index === 0 ? "winning" : "losing"}
        className="w-full -scale-x-100"
      />
    </div>
  );
});

export { PercentageDisplay };
