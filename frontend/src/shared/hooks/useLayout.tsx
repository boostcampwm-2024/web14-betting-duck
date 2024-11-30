import { LayoutContext } from "@/app/provider/LayoutProvider";
import React from "react";

function useLayout() {
  const context = React.useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
}

export { useLayout };
