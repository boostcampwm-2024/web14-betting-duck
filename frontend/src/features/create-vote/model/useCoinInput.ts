import { useEffect, useState } from "react";

export function useCoinInput(initialValue = 100) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("form-validation", {
        detail: {
          name: "coin",
          isValid: value >= 100,
        },
      }),
    );
  }, [value]);

  const incrementValue = () => setValue((prev) => prev + 100);
  const decrementValue = () => setValue((prev) => Math.max(100, prev - 100));

  return { value, setValue, incrementValue, decrementValue };
}
