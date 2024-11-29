import React from "react";

type DialogContextType = {
  isOpen: boolean;
  toggleOpen: () => void;
};

const DialogContext = React.createContext<DialogContextType>({
  isOpen: false,
  toggleOpen: () => {},
});

const DialogStateProvider = React.memo(
  ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const toggleOpen = React.useCallback(() => setIsOpen((prev) => !prev), []);

    const value = React.useMemo(
      () => ({
        isOpen,
        toggleOpen,
      }),
      [isOpen, toggleOpen],
    );

    return (
      <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
    );
  },
);

DialogStateProvider.displayName = "DialogStateProvider";

export { DialogContext, DialogStateProvider };
