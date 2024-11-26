import { BettingInput } from "./BettingInput";

function BettingForm() {
  return (
    <div className="flex gap-6">
      <BettingInput uses={"winning"} />
      <BettingInput uses={"losing"} />
    </div>
  );
}

export { BettingForm };
