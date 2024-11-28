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
): Promise<BetResultResponse> {
  try {
    const response = await fetch(`/api/betresults/${betRoomId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData: BetResultResponse = await response.json();

    if (response.ok) {
      return responseData;
    }

    if (response.status === 404) {
      throw new Error(responseData.data.message);
    }

    throw new Error("Unexpected response status: " + response.status);
  } catch (error) {
    console.error("요청 실패:", error);
    throw new Error("Failed to fetch bet results. Please try again.");
  }
}
