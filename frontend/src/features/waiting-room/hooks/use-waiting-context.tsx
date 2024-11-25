import React from "react";
import { WaitingRoomContext } from "../provider/WaitingRoomProvider";

function useWaitingContext() {
  const context = React.useContext(WaitingRoomContext);

  if (!context) {
    throw new Error(
      "useWaitingContext 는 반드시 WaitingRoomProvider 내부에서 사용되어야 합니다.",
    );
  }
  return context;
}

export { useWaitingContext };
