import { responseUserInfoSchema } from "@betting-duck/shared";

interface PlaceBettingParams {
  selectedOption: "option1" | "option2";
  roomId: string;
  bettingAmount: number;
  isPlaceBet: boolean;
}

async function getUserInfo() {
  const response = await fetch("/api/users/userInfo");
  if (!response.ok) {
    throw new Error("사용자 정보를 불러오는데 실패했습니다.");
  }

  const { data } = await response.json();
  const result = responseUserInfoSchema.safeParse(data);
  if (!result.success) {
    console.error(result.error);
    throw new Error("사용자 정보를 불러오는데 실패했습니다.");
  }

  return data;
}

async function placeBetting({
  selectedOption,
  roomId,
  bettingAmount,
  isPlaceBet,
}: PlaceBettingParams) {
  const { duck } = await getUserInfo();

  if (isPlaceBet) {
    console.error("이미 배팅을 했습니다.");
  }

  if (duck - bettingAmount < 0) {
    throw new Error("소유한 덕코인보다 더 많은 금액을 배팅할 수 없습니다.");
  }

  const response = await fetch("/api/bets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: {
        betAmount: 300,
        selectOption: selectedOption,
      },
      channel: {
        roomId,
      },
    }),
  });
  console.log(response);
  if (!response.ok) {
    throw new Error("배팅에 실패했습니다.");
  }
}

export { placeBetting };
