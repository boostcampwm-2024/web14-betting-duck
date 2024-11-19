export interface PredictionData {
  title: string;
  winCase: string;
  loseCase: string;
  timer: number;
  coin: number;
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

export type ValidationEventDetail = {
  name: "title" | "winCase" | "loseCase" | "timer" | "coin";
  isValid: boolean;
};

export type ValidationEvent = CustomEvent<ValidationEventDetail>;

declare global {
  interface WindowEventMap {
    "form-validation": ValidationEvent;
  }
}
