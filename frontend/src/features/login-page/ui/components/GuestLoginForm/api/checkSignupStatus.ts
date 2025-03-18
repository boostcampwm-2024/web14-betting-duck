async function checkSignupStatus(
  setIsSignedUp: React.Dispatch<React.SetStateAction<boolean>>,
  setAssignednickname: React.Dispatch<React.SetStateAction<string>>,
) {
  try {
    const response = await fetch("/api/users/guestloginactivity", {
      method: "GET",
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error("회원가입 상태 확인에 실패했습니다.");
    }

    const result = await response.json();
    const isSigned = result.data.loggedInBefore;
    setIsSignedUp(isSigned);
    if (isSigned) {
      setAssignednickname(result.data.nickname.replace(/^익명의 /, ""));
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("오류 발생:", error.message);
    } else {
      console.error("알 수 없는 오류 발생:", error);
    }
  }
}

export { checkSignupStatus };
