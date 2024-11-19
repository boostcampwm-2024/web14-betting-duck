import { useMemo, useState } from "react";
import { PredictionData } from "./types";
import { createPrediction } from "./api";
import { formatPredictionData } from "./helpers/formatData";

function usePredictionStore() {
  const [formState, setFormState] = useState<PredictionData>({
    title: "",
    winCase: "",
    loseCase: "",
    timer: 1,
    defaultBetAmount: 100,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDefaultBetAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = Number(e.target.value);
    setFormState((prev) => ({
      ...prev,
      defaultBetAmount: value,
    }));
  };

  const incrementDefaultBetAmount = () => {
    setFormState((prev) => ({
      ...prev,
      defaultBetAmount: prev.defaultBetAmount + 100,
    }));
  };

  const decrementDefaultBetAmount = () => {
    setFormState((prev) => ({
      ...prev,
      defaultBetAmount: Math.max(100, prev.defaultBetAmount - 100),
    }));
  };

  const isFormVaild = useMemo(() => {
    return (
      formState.title.trim() !== "" &&
      formState.winCase.trim() !== "" &&
      formState.loseCase.trim() !== "" &&
      formState.defaultBetAmount >= 100
    );
  }, [formState]);

  const handleTimerIncrement = () => {
    setFormState((prev) => ({
      ...prev,
      timer: prev.timer + 1,
    }));
  };

  const handleTimerDecrement = () => {
    setFormState((prev) => ({
      ...prev,
      timer: Math.max(1, prev.timer - 1),
    }));
  };

  const submitPrediction = async () => {
    const requestData = formatPredictionData(formState);
    try {
      const result = await createPrediction(requestData);
      setFormState({
        title: "",
        winCase: "",
        loseCase: "",
        timer: 1,
        defaultBetAmount: 100,
      });
      console.log(result);
    } catch (error) {
      // TODO: error 처리 로직 좀 다듬어야 함
      console.error("승부예측 정보 전송 오류:", error);
    }
  };

  return {
    formState,
    handleTimerIncrement,
    handleTimerDecrement,
    handleDefaultBetAmountChange,
    incrementDefaultBetAmount,
    decrementDefaultBetAmount,
    handleInputChange,
    isFormVaild,
    submitPrediction,
  };
}

export { usePredictionStore };
