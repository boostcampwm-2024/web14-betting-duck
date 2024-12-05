import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/shared/components/Dialog";
import { EditIcon, InfoIcon } from "@/shared/icons";
import { EditFormStatusForm } from "./EditFormStatusForm";
import React from "react";
import { z } from "zod";
import { responseBetRoomInfo } from "@betting-duck/shared";

const VotingStatusCard = React.memo(
  ({
    bettingRoomInfo,
  }: {
    bettingRoomInfo: z.infer<typeof responseBetRoomInfo>;
  }) => {
    const { channel } = bettingRoomInfo;

    return (
      <div className="bg-primary text-secondary-default text-secondary flex w-full flex-col gap-2 rounded-lg p-3 shadow-md">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <InfoIcon />
            <span>투표 생성 정보</span>
          </div>
          {bettingRoomInfo.channel.isAdmin && (
            <Dialog>
              <DialogTrigger>
                <EditIcon />
              </DialogTrigger>
              <DialogContent>
                <EditFormStatusForm info={bettingRoomInfo} />
              </DialogContent>
            </Dialog>
          )}
        </div>
        <h1 className="text-xl font-extrabold">{channel.title}</h1>
      </div>
    );
  },
);

VotingStatusCard.displayName = "VotingStatusCard";

export { VotingStatusCard };
