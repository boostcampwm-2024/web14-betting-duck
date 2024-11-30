import { BettingContainer } from "./ui/BettingContainer";
import { BettingTimer } from "@/shared/components/BettingTimer/BettingTimer";
import { BettingSharedLink } from "@/shared/components/BettingSharedLink/BettingSharedLink";
import { useLayoutShift } from "@/shared/hooks/useLayoutShift";

function BettingPage() {
  useLayoutShift();
  return (
    <div className="flex w-[100cqw] flex-col">
      <BettingTimer />
      <BettingContainer />
      <BettingSharedLink />
    </div>
  );
}

export { BettingPage };
