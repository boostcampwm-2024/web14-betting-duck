import { BettingProvider } from "./provider/BettingProvider";
import { BettingContainer } from "./ui/BettingContainer";
import { BettingTimer } from "./ui/BettingTimer";
import { BettingSharedLink } from "./ui/BettingSharedLink";

function BettingPage() {
  return (
    <BettingProvider>
      <div className="flex w-[100cqw] flex-col">
        <BettingTimer />
        <BettingContainer />
        <BettingSharedLink />
      </div>
    </BettingProvider>
  );
}

export { BettingPage };
