import { PredictionRequest } from "./types";

async function createPrediction(data: PredictionRequest) {
  const response = await fetch("/api/betrooms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("API 요청 실패");
  }

  return response.json();
}

export { createPrediction };
