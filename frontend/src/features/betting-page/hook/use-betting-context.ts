import React from "react";
import { BettingContext } from "../provider/BettingProvider";

function useBettingContext() {
  const context = React.useContext(BettingContext);
  if (!context) {
    throw new Error("useContext must be used within a BettingProvider");
  }
  return context;
}

export { useBettingContext };
