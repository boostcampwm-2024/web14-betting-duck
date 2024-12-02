export class PlaceBetDto {
  sender: {
    betAmount: number;
    selectOption: "option1" | "option2";
  };
  channel: {
    roomId: string;
  };
}
