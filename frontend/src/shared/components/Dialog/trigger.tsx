import React from "react";
import { DialogContext } from ".";
import { Slot } from "@radix-ui/react-slot";

interface DialogTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const DialogTrigger = React.memo(
  ({ asChild, ...props }: DialogTriggerProps) => {
    const { toggleOpen } = React.useContext(DialogContext);
    const Comp = asChild ? Slot : "button";

    const handleClick = React.useCallback(
      <T extends Element>(e: React.MouseEvent<T>) => {
        e.preventDefault();
        toggleOpen();
        if (props.onClick) {
          props.onClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
        }
      },
      [toggleOpen, props],
    );

    return <Comp className="h-fit w-fit" onClick={handleClick} {...props} />;
  },
);

DialogTrigger.displayName = "DialogTrigger";

export { DialogTrigger };
