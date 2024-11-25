import React from "react";

function useEffectOnce(effect: () => (() => void) | void) {
  const destroyRef = React.useRef<(() => void) | void>();
  const effectCalled = React.useRef(false);
  const renderAfterCalled = React.useRef(false);
  const [, setVal] = React.useState<number>(0);

  if (effectCalled.current) {
    renderAfterCalled.current = true;
  }

  React.useEffect(() => {
    // 이미 effect가 호출되었다면 더 이상 실행하지 않음
    if (!effectCalled.current) {
      destroyRef.current = effect();
      effectCalled.current = true;
      setVal((val) => val + 1); // 리렌더링 강제
    }

    return () => {
      // cleanup은 항상 실행되어야 함
      if (destroyRef.current) {
        destroyRef.current();
      }
    };
  }, [effect]);

  return effectCalled.current;
}

export { useEffectOnce };
