import React from "react";
import { useFocusLock } from "./hook";
import { DialogContext } from ".";

interface FocusLockProps {
  children: React.ReactNode;
}

export const FocusLock: React.FC<FocusLockProps> = ({ children }) => {
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
};
