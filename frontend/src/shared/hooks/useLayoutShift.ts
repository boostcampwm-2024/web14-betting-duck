import React from "react";
import { useLayout } from "./useLayout";

function useLayoutShift() {
  const { setLayoutType } = useLayout();

  React.useEffect(() => {
    setLayoutType("wide");

    return () => {
      setLayoutType("default");
    };
  }, [setLayoutType]);
}

export { useLayoutShift };
