export interface BettingRoom {
  title: string;
  timeRemaining: number;
  option1: {
    content: string;
    stats: {
      coinAmount: number;
      bettingRate: string;
      participant: number;
      percentage: number;
    };
  };
  option2: {
    content: string;
    stats: {
      coinAmount: number;
      bettingRate: string;
      participant: number;
      percentage: number;
    };
  };
}

export interface BettingStats {
  participants: number;
  totalAmount: number;
  multiplier: number;
  returnRate: number;
}

export interface FetchBetRoomInfoData {
  channel: {
    creator: string;
    status: "waiting" | "active" | "timeover" | "finished";
    option1: {
      participants: string;
      currentBets: string;
    };
    option2: {
      participants: string;
      currentBets: string;
    };
  };
}
