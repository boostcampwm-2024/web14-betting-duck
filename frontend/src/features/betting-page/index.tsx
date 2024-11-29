import { BettingProvider } from "./provider/BettingProvider";
import { BettingContainer } from "./ui/BettingContainer";
import { BettingTimer } from "@/shared/components/BettingTimer/BettingTimer";
import { BettingSharedLink } from "@/shared/components/BettingSharedLink/BettingSharedLink";

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
