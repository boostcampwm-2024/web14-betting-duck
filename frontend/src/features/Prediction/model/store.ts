import { useMemo, useState } from "react";

// TODO: input에 값이 입력될 때마다 해당 컴포넌트 전체가 리렌더링 되는 문제 해결
interface FormState {
  title: string;
  winCase: string;
  loseCase: string;
  // TODO: timer와 최소 베팅 금액도 추가해야 함
}

function usePredictionStore() {
  const [formState, setFormState] = useState<FormState>({
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

  return { formState, handleInputChange, isFormVaild };
}

export { usePredictionStore };
