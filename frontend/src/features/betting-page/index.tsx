import { cn } from "@/shared/misc";
import { BettingProvider } from "./provider/BettingProvider";
import { BettingContainer } from "./ui/BettingContainer";
import { BettingTimer } from "./ui/BettingTimer";
import { BettingSharedLink } from "./ui/BettingSharedLink";

function BettingPage() {
  return (
    <div className={cn("betting-container", "flex min-w-0.5")}>
      <BettingProvider>
        <div className="flex w-[100cqw] flex-col">
          <BettingTimer />
          <BettingContainer />
          <BettingSharedLink />
        </div>
      </BettingProvider>
    </div>
  );
}

export { BettingPage };
