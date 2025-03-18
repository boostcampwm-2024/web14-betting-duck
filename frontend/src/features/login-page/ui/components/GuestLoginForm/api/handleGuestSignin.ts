async function handleGuestSignin(nickname: string) {
  try {
    const response = await fetch("/api/users/guestsignin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nickname: `익명의 ${nickname}` }),
    });
    if (!response.ok) throw new Error("게스트 로그인에 실패했습니다.");
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("게스트 로그인에 실패했습니다.", error);
  }
}

export { handleGuestSignin };
