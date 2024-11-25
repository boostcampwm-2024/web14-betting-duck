import React from "react";
import { DialogContext } from ".";
import { cn } from "../../misc";
import { createPortal } from "react-dom";
import { FocusLock } from "./focus-lock";

const DialogPortal = React.memo(
  ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    return createPortal(
      <React.Fragment>
        <div
          className="absolute left-0 top-0 z-0 h-full w-full backdrop-blur-sm"
          style={{ background: "oklch(3.82% 0 285 / 44.4%)" }}
        />
        <FocusLock>
          <div className={cn(className, "fixed-center font-nanum-r")}>
            {children}
          </div>
        </FocusLock>
      </React.Fragment>,
      document.body,
    );
  },
);

DialogPortal.displayName = "DialogPortal";

const DialogContent = React.memo(
  ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    const { isOpen } = React.useContext(DialogContext);

    if (!isOpen) return null;

    return <DialogPortal className={className}>{children}</DialogPortal>;
  },
);

DialogContent.displayName = "DialogContent";

export { DialogContent };
