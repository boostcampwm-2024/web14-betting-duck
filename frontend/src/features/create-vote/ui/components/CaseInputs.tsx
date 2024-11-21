import React from "react";
import { InputField } from "../../../../shared/components/input/InputField";
import { DuckIcon } from "@/shared/icons";
import { useCaseInput } from "@/features/create-vote/model/useCaseInput";

const CaseInputs = React.memo(() => {
  const { winValue, setWinValue, loseValue, setLoseValue } = useCaseInput();

  return (
    <div className="bg-layout-sidebar w-full rounded-lg shadow-inner">
      <InputField
        id="create-vote-win"
        placeholder="승리에 해당하는 예측 케이스를 적어주세요."
        name="winCase"
        value={winValue}
        onChange={(e) => setWinValue(e.target.value)}
      >
        <DuckIcon className="text-bettingBlue h-4 w-4" />
      </InputField>
      <div className="border-border border-t" />
      <InputField
        id="create-vote-lose"
        placeholder="패배에 해당하는 예측 케이스를 적어주세요."
        name="loseCase"
        value={loseValue}
        onChange={(e) => setLoseValue(e.target.value)}
      >
        <DuckIcon className="text-bettingPink h-4 w-4" />
      </InputField>
    </div>
  );
});

export { CaseInputs };
