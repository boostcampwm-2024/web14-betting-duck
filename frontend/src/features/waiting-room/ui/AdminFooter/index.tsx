import React from "react";
import { CancleVottingButton } from "./CancleButton";
import { StartVotingButton } from "./StartVotingButton";
import { responseBetRoomInfo } from "@betting-duck/shared";
import { z } from "zod";

function AdminFooter({
  bettingRoomInfo,
}: {
  bettingRoomInfo: z.infer<typeof responseBetRoomInfo>;
}) {
  return (
    <React.Fragment>
      <CancleVottingButton />
      <StartVotingButton bettingRoomInfo={bettingRoomInfo} />
    </React.Fragment>
  );
}

export { AdminFooter };
