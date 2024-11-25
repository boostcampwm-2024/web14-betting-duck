import { useEffect, useState } from "react";

export function useCaseInput(winIntialValue = "", loseInitialValue = "") {
  const [winValue, setWinValue] = useState(winIntialValue);
  const [loseValue, setLoseValue] = useState(loseInitialValue);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("form-validation", {
        detail: {
          name: "winCase",
          isValid: winValue.trim().length > 0,
        },
      }),
    );
  }, [winValue]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("form-validation", {
        detail: {
          name: "loseCase",
          isValid: loseValue.trim().length > 0,
        },
      }),
    );
  }, [loseValue]);

  return { winValue, setWinValue, loseValue, setLoseValue };
}
