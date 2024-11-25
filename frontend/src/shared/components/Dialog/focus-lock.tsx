import React from "react";
import { useFocusLock } from "./hook";
import { DialogContext } from ".";

const FocusLock = React.memo(({ children }: { children: React.ReactNode }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { toggleOpen } = React.useContext(DialogContext);
  useFocusLock(containerRef, toggleOpen);

  return (
    <div
      ref={containerRef}
      role="dialog"
      className="outline-none"
      aria-modal="true"
      tabIndex={-1}
    >
      {children}
    </div>
  );
});

FocusLock.displayName = "FocusLock";

export { FocusLock };
