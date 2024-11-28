import React from "react";

function useToggle(initValue = false): [boolean, () => void] {
  if (typeof initValue !== "boolean") {
    console.warn("useToggle의 인자값은 boolean이어야 합니다.");
  }

  const [isToggled, setToggled] = React.useState(initValue);

  const executeToggle = React.useCallback(() => {
    setToggled((prev) => !prev);
  }, []);

  return [isToggled, executeToggle];
}

export default useToggle;
