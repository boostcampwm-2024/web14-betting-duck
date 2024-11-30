import React from "react";

type LayoutType = "default" | "wide";

interface LayoutContextType {
  layoutType: LayoutType;
  setLayoutType: (layoutType: LayoutType) => void;
}

type LayoutContextProviderProps = {
  children: React.ReactNode;
};

const LayoutContext = React.createContext<LayoutContextType | undefined>(
  undefined,
);

function LayoutProvider({ children }: LayoutContextProviderProps) {
  const [layoutType, setLayoutType] = React.useState<LayoutType>("default");

  return (
    <LayoutContext.Provider value={{ layoutType, setLayoutType }}>
      {children}
    </LayoutContext.Provider>
  );
}

export { LayoutContext, LayoutProvider };
