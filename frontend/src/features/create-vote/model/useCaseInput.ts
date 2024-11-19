import { useEffect, useState } from "react";

export function useCaseInput() {
  const [winValue, setWinValue] = useState("");
  const [loseValue, setLoseValue] = useState("");

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
