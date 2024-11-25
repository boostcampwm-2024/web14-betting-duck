import { ArrowDownIcon, ArrowUpIcon, TimerIcon } from "@/shared/icons";
import React from "react";
import { useTimer } from "@/features/create-vote/model/useTimer";

const Timer = React.memo(({ initialValue = 1 }: { initialValue?: number }) => {
  const { value, incrementValue, decrementValue } = useTimer(initialValue);

  return (
    <div className="bg-layout-sidebar flex w-1/2 items-center justify-between gap-1 rounded-lg pl-2 shadow-inner">
      <input
        id="create-timer"
        type="number"
        min={1}
        hidden
        readOnly
        value={value}
        name="timer"
      />
      <div className="flex items-center gap-1">
        <TimerIcon />
        <span className="text-md text-default">타이머 설정</span>
        <div className="border-border h-3 border-l"></div>
        <span className="text-default ml-2 text-lg font-bold">{value}</span>
      </div>
      <div className="bg-primary flex flex-col items-center justify-center rounded-r-lg p-1">
        <button type="button" onClick={incrementValue}>
          <ArrowUpIcon />
        </button>
        <div className="my-1 w-full border-t border-[#F0F4FA2B]" />
        <button type="button" onClick={decrementValue}>
          <ArrowDownIcon />
        </button>
      </div>
    </div>
  );
});

export { Timer };
