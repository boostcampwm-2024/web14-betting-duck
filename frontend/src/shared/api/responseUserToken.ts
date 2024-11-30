async function responseUserToken() {
  const response = await fetch("/api/users/token", {
    headers: {
      "Cache-Control": "stale-while-revalidate",
      Pragma: "no-cache",
    },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("토큰을 불러오는데 실패했습니다.");
  }
  return response;
}

export { responseUserToken };
