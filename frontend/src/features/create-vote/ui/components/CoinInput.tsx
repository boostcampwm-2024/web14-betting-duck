import { ArrowDownIcon, ArrowUpIcon, DuckCoinIcon } from "@/shared/icons";
import React from "react";
import { useCoinInput } from "@/features/create-vote/model/useCoinInput";

const CoinInput = React.memo(() => {
  const { value, incrementValue, decrementValue } = useCoinInput();

  return (
    <div className="bg-layout-sidebar flex w-1/2 items-center justify-between gap-1 rounded-lg pl-2 shadow-inner">
      <input
        id="create-coin"
        type="number"
        min={100}
        hidden
        readOnly
        name="coin"
        value={value}
      />
      <div className="flex items-center gap-1">
        <DuckCoinIcon className="h-3 w-3 text-[#4D5765]" />
        <span className="text-md text-default">최소 금액 설정</span>
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

export { CoinInput };
