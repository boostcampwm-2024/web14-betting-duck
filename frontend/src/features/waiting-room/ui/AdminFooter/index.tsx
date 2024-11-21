import React from "react";
import { CancleVottingButton } from "./CancleButton";
import { StartVotingButton } from "./StartVotingButton";

function AdminFooter() {
  return (
    <React.Fragment>
      <CancleVottingButton />
      <StartVotingButton />
    </React.Fragment>
  );
}

export { AdminFooter };
