import { LoginIDIcon } from "@/shared/icons";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../model/store";
import { Warning } from "./Warning";
import { useNavigate } from "@tanstack/react-router";
import { useUserContext } from "@/shared/hooks/useUserContext";

function GuestLoginForm({ to, roomId }: { to?: string; roomId?: string }) {
  const [nickname, setNickname] = useState("");
  const { error } = useAuthStore();
  const [isSignedUp, setIsSignedUp] = useState(false);

  const { setUserInfo } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    const checkSignupStatus = async () => {
      try {
        const response = await fetch("/api/users/guestloginactivity", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("회원가입 상태 확인에 실패했습니다.");
        }

        const result = await response.json();
        const isSigned = result.data.loggedInBefore;
        setIsSignedUp(isSigned);
        if (isSigned) {
          setNickname(result.data.nickname.replace(/^익명의 /, ""));
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error("오류 발생:", error.message);
        } else {
          console.error("알 수 없는 오류 발생:", error);
        }
      }
    };

    checkSignupStatus();
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // const result = await handleGuestLogin({ nickname: `익명의 ${nickname}` });
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
      setUserInfo({
        role: "guest",
        nickname: data.nickname,
        isAuthenticated: true,
      });
      if (to && roomId) {
        window.location.href = `/betting/${roomId}/waiting`;
      }

      navigate({
        to: "/my-page",
        search: {
          nickname: decodeURIComponent(nickname),
        },
      });
    } catch (error) {
      console.error("게스트 로그인에 실패했습니다.", error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="mt-3 w-[90%]">
      <div className="bg-layout-sidebar w-full overflow-hidden rounded-lg shadow-inner">
        <div className="flex items-center shadow-md">
          <label
            htmlFor={"nickname"}
            className="flex w-full items-center gap-2 p-4"
          >
            <div className="flex-shrink-0">
              <LoginIDIcon />
            </div>
            <div className="border-border h-3 border-l"></div>
            <div className="text-md text-default-disabled w-[15%] font-bold">
              익명의{" "}
            </div>
            <input
              id="nickname"
              type="text"
              placeholder={"닉네임을 입력해주세요. (1글자 이상 10글자 이하)"}
              className="text-md w-full border-none bg-transparent outline-none"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              name="nickname"
              readOnly={isSignedUp}
            />
          </label>
        </div>
      </div>
      {isSignedUp && (
        <Warning message="이미 로그인 기록이 있습니다. 해당 닉네임으로 로그인해주세요." />
      )}
      {error && <Warning message={error} />}
      <button
        type="submit"
        className="bg-default disabled:bg-default-disabled hover:bg-default-hover shadow-middle mt-3 w-full rounded-md py-2 text-white"
      >
        로그인
      </button>
    </form>
  );
}

export { GuestLoginForm };
