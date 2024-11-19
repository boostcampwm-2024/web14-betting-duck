export interface PredictionData {
  title: string;
  winCase: string;
  loseCase: string;
  timer: number;
  defaultBetAmount: number;
}

export interface PredictionRequest {
  channel: {
    title: string;
    options: {
      option1: string;
      option2: string;
    };
    settings: {
      duration: number;
      defaultBetAmount: number;
    };
  };
}
