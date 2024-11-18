import { PredictionData, PredictionRequest } from "../types";

export function formatPredictionData(
  formState: PredictionData,
): PredictionRequest {
  return {
    channel: {
      title: formState.title,
      options: {
        option1: formState.winCase,
        option2: formState.loseCase,
      },
      settings: {
        duration: formState.timer * 60,
        defaultBetAmount: formState.defaultBetAmount,
      },
    },
  };
}
