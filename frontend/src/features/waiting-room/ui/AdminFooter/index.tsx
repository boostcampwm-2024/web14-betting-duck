import React from "react";
import { CancleVottingButton } from "./CancleButton";
import { StartVotingButton } from "./StartVotingButton";
import { responseBetRoomInfo } from "@betting-duck/shared";
import { z } from "zod";
import { ParticipateButton } from "./ParticipateButton";

function AdminFooter({
  bettingRoomInfo,
  setSnackbarOpen,
}: {
  bettingRoomInfo: z.infer<typeof responseBetRoomInfo>;
  setSnackbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <React.Fragment>
      <CancleVottingButton />
      <ParticipateButton setSnackbarOpen={setSnackbarOpen} />
      <StartVotingButton bettingRoomInfo={bettingRoomInfo} />
    </React.Fragment>
  );
}

export { AdminFooter };
