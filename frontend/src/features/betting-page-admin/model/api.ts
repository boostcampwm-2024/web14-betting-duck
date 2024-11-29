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

export async function finish(betRoomId: string) {
  try {
    const response = await fetch(`/api/betrooms/end/${betRoomId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("종료 요청 성공:", data);
    return data;
  } catch (error) {
    console.error("종료 요청 실패:", error);
    throw error;
  }
}
