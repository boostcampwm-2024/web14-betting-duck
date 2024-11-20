import { useEffect, useState } from "react";

export function useTitleInput(initialValue = "") {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("form-validation", {
        detail: {
          name: "title",
          isValid: value.trim().length > 0,
        },
      }),
    );
  }, [value]);

  return { value, setValue };
}
