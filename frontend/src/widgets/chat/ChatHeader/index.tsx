import { ChartTitle } from "./ui/ChatTitle";
import { PredictButton } from "./ui/PredictButton";

function ChatHeader() {
  return (
    <div className="flex h-full w-full items-center rounded-lg px-4">
      <div className="bg-primary-default text-secondary-default font-nanum-eb shadow-long flex w-full flex-row items-center justify-between rounded-lg px-9 py-4">
        <ChartTitle title="KBO 우승은 KIA다!!" />
        <PredictButton />
      </div>
    </div>
  );
}

export { ChatHeader };
