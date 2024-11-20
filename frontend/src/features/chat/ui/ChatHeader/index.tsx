import React from "react";
import { ChartTitle } from "./ui/ChatTitle";
import { PredictButton } from "./ui/PredictButton";

function ChatHeader() {
  return (
    <React.Fragment>
      <div className="bg-layout-main relative flex h-fit w-full items-center px-4">
        <div className="bg-primary text-secondary font-nanum-eb shadow-long flex w-full flex-row items-center justify-between rounded-lg px-9 py-4">
          <ChartTitle title="KBO 우승은 KIA다!!" />
          <PredictButton />
        </div>
        <div
          id="message-container-scroll-top"
          className="absolute -bottom-[16px] left-0 h-[1px] w-full"
        />
      </div>
    </React.Fragment>
  );
}

export { ChatHeader };
