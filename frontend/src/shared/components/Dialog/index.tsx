import React from "react";
import { DialogContent } from "./content";
import { DialogTrigger } from "./trigger";
import { DialogStateProvider, DialogContext } from "./context";

function Dialog({ children }: { children: React.ReactNode }) {
  return <DialogStateProvider>{children}</DialogStateProvider>;
}

export { Dialog, DialogContent, DialogTrigger, DialogContext };
