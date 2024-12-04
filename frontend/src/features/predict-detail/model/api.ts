import { bettinResultSchema, type BetResultResponseType } from "./schema";

interface BetResultResponseSuccess {
  status: 200;
  data: {
    option_1_total_bet: string;
    option_2_total_bet: string;
    option_1_total_participants: string;
    option_2_total_participants: string;
    winning_option: "option1" | "option2";
    message: string;
  };
}

interface BetResultResponseError {
  status: 404;
  data: {
    message: string;
  };
}

type BetResultResponse = BetResultResponseSuccess | BetResultResponseError;

export async function getBetResults(
  betRoomId: string,
): Promise<BetResultResponseType> {
  try {
    const response = await fetch(`/api/betresults/${betRoomId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("베팅 결과를 가져오는데 실패했습니다.");
    }

    const responseData: BetResultResponse = await response.json();
    const parsedData = bettinResultSchema.safeParse(responseData.data);
    if (!parsedData.success) {
      console.error("Invalid response data:", parsedData.error);
      throw new Error("베팅 결과를 가져오는데 실패했습니다.");
    }
    return parsedData.data;
  } catch (error) {
    console.error("요청 실패:", error);
    throw new Error("Failed to fetch bet results. Please try again.");
  }
}
