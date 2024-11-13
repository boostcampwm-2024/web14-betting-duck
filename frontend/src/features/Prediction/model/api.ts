import { PredictionData } from "./types";

async function createPrediction(data: PredictionData) {
  console.log("API 요청");
  console.log("data:", data);
}

export { createPrediction };
