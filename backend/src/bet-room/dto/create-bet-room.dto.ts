export class CreateBetRoomDto {
  channel: {
    title: string;
    options: {
      option1: string;
      option2: string;
    };
    settings: {
      duration: number;
      defaultBetAmount: number;
      maxParticipants: number;
    };
  };
}
