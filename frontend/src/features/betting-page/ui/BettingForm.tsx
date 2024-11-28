import { BettingInput } from "./BettingInput";

function BettingForm() {
  return (
    <div className="flex justify-end gap-16">
      <BettingInput uses={"winning"} />
      <BettingInput uses={"losing"} />
    </div>
  );
}

export { BettingForm };
