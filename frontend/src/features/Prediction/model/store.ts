import { useMemo, useState } from "react";
import { PredictionData } from "./types";
import { createPrediction } from "./api";

// TODO: input에 값이 입력될 때마다 해당 컴포넌트 전체가 리렌더링 되는 문제 해결

function usePredictionStore() {
  const [formState, setFormState] = useState<PredictionData>({
    title: "",
    winCase: "",
    loseCase: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFormVaild = useMemo(() => {
    return (
      formState.title.trim() !== "" &&
      formState.winCase.trim() !== "" &&
      formState.loseCase.trim() !== ""
    );
  }, [formState]);

  const submitPrediction = async () => {
    //TODO: API 요청 함수 호출해야함. API 요청 함수는 api.ts에 입력할 것
    try {
      // API 요청 함수 호출
      const result = await createPrediction(formState);
      setFormState({
        title: "",
        winCase: "",
        loseCase: "",
      });
      console.log(result);
    } catch (error) {
      // TODO: error 처리 로직 좀 다듬어야 함
      console.error("승부예측 정보 전송 오류:", error);
    }
  };

  return { formState, handleInputChange, isFormVaild, submitPrediction };
}

export { usePredictionStore };
