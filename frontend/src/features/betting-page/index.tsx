import { BettingProvider } from "./provider/BettingProvider";
import { BettingContainer } from "./ui/BettingContainer";

function BettingPage() {
  return (
    <BettingProvider>
      <BettingContainer />
    </BettingProvider>
  );
}

export { BettingPage };
