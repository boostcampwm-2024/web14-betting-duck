import React from "react";
import { DialogContent } from "./content";
import { DialogTrigger } from "./trigger";
import useToggle from "../../shared/hooks/use-trigger";

type DialogContextType = {
  isOpen: boolean;
  toggleOpen: () => void;
};

const DialogContext = React.createContext<DialogContextType>({
  isOpen: false,
  toggleOpen: () => {},
});

function Dialog({ children }: { children: React.ReactNode }) {
  const [isOpen, toggleOpen] = useToggle();

  return (
    <DialogContext.Provider value={{ isOpen, toggleOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

export { Dialog, DialogContent, DialogTrigger, DialogContext };
