import React from "react";

function useEffectOnce(callback: () => void) {
  const isUsedRef = React.useRef(false);
  const callbackRef = React.useRef(callback);

  React.useEffect(() => {
    if (!isUsedRef.current) {
      isUsedRef.current = true;
      callbackRef.current();
    }
  }, []);
}

export { useEffectOnce };
