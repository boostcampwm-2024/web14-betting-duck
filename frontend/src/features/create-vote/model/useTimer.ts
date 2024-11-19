import { useEffect, useState } from "react";

export function useTimer(initialValue = 1) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("form-validation", {
        detail: {
          name: "timer",
          isValid: value >= 1,
        },
      }),
    );
  }, [value]);

  const incrementValue = () => setValue((prev) => prev + 1);
  const decrementValue = () => setValue((prev) => Math.max(1, prev - 1));

  return { value, incrementValue, decrementValue };
}
