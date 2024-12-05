import React from "react";
import { ChartTitle } from "./ui/ChatTitle";
import { PredictButton } from "./ui/PredictButton";
import { channelSchema } from "@betting-duck/shared";
import { z } from "zod";
import { BettingRoomInfo } from "@/shared/types";

function bettingRoomTypeGuard(
  data: unknown,
): data is z.infer<typeof channelSchema> {
  return channelSchema.safeParse(data).success;
}

function ChatHeader({ bettingRoomInfo }: { bettingRoomInfo: BettingRoomInfo }) {
  const { channel } = bettingRoomInfo;
  if (!bettingRoomTypeGuard(channel)) {
    throw new Error("bettingRoomInfo가 channelSchema에 맞지 않습니다.");
  }

  return (
    <React.Fragment>
      <div className="bg-layout-main relative flex h-fit w-full items-center px-4">
        <div className="bg-primary text-secondary font-nanum-eb shadow-long flex w-full flex-row items-center justify-between rounded-lg px-9 py-4">
          <ChartTitle title={channel.title} />
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
