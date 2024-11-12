import React from "react";
import { DialogContext } from ".";
import { Slot } from "@radix-ui/react-slot";

interface DialogTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

function DialogTrigger({ asChild, ...props }: DialogTriggerProps) {
  const { toggleOpen } = React.useContext(DialogContext);
  const Comp = asChild ? Slot : "button";

  return <Comp onClick={toggleOpen} {...props} />;
}

export { DialogTrigger };
