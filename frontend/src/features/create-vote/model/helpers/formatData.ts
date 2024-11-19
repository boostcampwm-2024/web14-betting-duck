import { PredictionData, PredictionRequest } from "../types";

export function formatPredictionData({
  title,
  winCase,
  loseCase,
  timer,
  coin,
}: PredictionData): PredictionRequest {
  return {
    channel: {
      title: title,
      options: {
        option1: winCase,
        option2: loseCase,
      },
      settings: {
        duration: timer * 60,
        defaultBetAmount: coin,
      },
    },
  };
}
