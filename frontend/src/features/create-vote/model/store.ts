import { createPrediction } from "./api";
import { formatPredictionData } from "./helpers/formatData";

function usePredictionStore() {
  const submitPrediction = async (formData: FormData) => {
    const requestData = formatPredictionData({
      title: (formData.get("title") as string) || "",
      winCase: (formData.get("winCase") as string) || "",
      loseCase: (formData.get("loseCase") as string) || "",
      timer: (Number(formData.get("timer")) as number) || 1,
      coin: (Number(formData.get("coin")) as number) || 100,
    });
    try {
      const result = await createPrediction(requestData);
      console.log(result);
    } catch (error) {
      console.error("승부예측 정보 전송 오류:", error);
    }
  };

  return {
    submitPrediction,
  };
}

export { usePredictionStore };
