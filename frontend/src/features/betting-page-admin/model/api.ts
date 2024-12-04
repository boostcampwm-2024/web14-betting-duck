export async function refund(betRoomId: string) {
  try {
    const response = await fetch(`/api/betrooms/refund/${betRoomId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("환불 요청 성공:", data);
    return data;
  } catch (error) {
    console.error("환불 요청 실패:", error);
    throw error;
  }
}

interface EndBetRoomResponse {
  status: number;
  data: {
    bet_room_id?: string;
    message: string;
  };
}
export async function endBetRoom(
  betRoomId: string,
  winningOption: "option1" | "option2",
): Promise<string> {
  try {
    const response = await fetch(`/api/betrooms/end/${betRoomId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        winning_option: winningOption,
      }),
    });

    const responseData: EndBetRoomResponse = await response.json();

    if (response.ok) {
      console.log("배팅 종료 성공:", responseData.data.message);
      return responseData.data.message;
    }

    if (response.status === 401) {
      console.error("인증되지 않은 사용자:", responseData.data.message);
      throw new Error(responseData.data.message);
    }

    if (response.status === 403) {
      console.error("접근 권한이 없음:", responseData.data.message);
      throw new Error(responseData.data.message);
    }

    console.error("알 수 없는 오류:", responseData.data.message);
    throw new Error("Unexpected error: " + responseData.data.message);
  } catch (error) {
    console.error("요청 실패:", error);
    throw new Error("Failed to end bet room. Please try again.");
  }
}
