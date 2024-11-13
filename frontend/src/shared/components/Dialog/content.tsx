import React from "react";
import { DialogContext } from ".";
import { cn } from "../../shared/misc";
import { createPortal } from "react-dom";
import { FocusLock } from "./focus-lock";

function DialogContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { isOpen } = React.useContext(DialogContext);
  if (!isOpen) return null;

  return createPortal(
    <React.Fragment>
      <div className="bg-blur absolute left-0 top-0 z-0 h-full w-full backdrop-blur-sm" />
      <FocusLock>
        <div className={cn(className, "fixed-center font-nanum-r")}>
          {children}
        </div>
      </FocusLock>
    </React.Fragment>,
    document.body,
  );
}

export { DialogContent };
