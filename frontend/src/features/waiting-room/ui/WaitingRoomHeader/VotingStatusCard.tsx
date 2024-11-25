import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/shared/components/Dialog";
import { EditIcon, InfoIcon } from "@/shared/icons";
import { EditFormStatusForm } from "./EditFormStatusForm";
import { useWaitingContext } from "../../hooks/use-waiting-context";
import React from "react";
import { useUserContext } from "@/shared/hooks/use-user-context";

const VotingStatusCard = React.memo(() => {
  const { info } = useWaitingContext();
  const { userInfo } = useUserContext();
  const { channel } = info;

  return (
    <div className="bg-primary text-secondary-default text-secondary flex w-full flex-col gap-2 rounded-lg p-3 shadow-md">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <InfoIcon />
          <span>투표 생성 정보</span>
        </div>
        {userInfo.role === "admin" && (
          <Dialog>
            <DialogTrigger>
              <EditIcon />
            </DialogTrigger>
            <DialogContent>
              <EditFormStatusForm info={info} />
            </DialogContent>
          </Dialog>
        )}
      </div>
      <h1 className="text-xl font-extrabold">{channel.title}</h1>
    </div>
  );
});

VotingStatusCard.displayName = "VotingStatusCard";

export { VotingStatusCard };
