import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../../../../model/store";
import { Warning } from "../../Warning";
import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { authQueries } from "@/shared/lib/auth/authQuery";
import { useAuthState } from "@/shared/hooks/useAuthState";
import { Input } from "./Input";
import { checkSignupStatus } from "../api/checkSignupStatus";
import { handleGuestSignin } from "../api/handleGuestSignin";
import { updateQueryClient } from "@/shared/lib/updateQueryClient";

function GuestLoginForm({ to, roomId }: { to?: string; roomId?: string }) {
  const [assignednickname, setAssignednickname] = useState("");
  const { error } = useAuthStore();
  const [issignedup, setIssignedup] = useState(false);
  const queryClient = useQueryClient();
  const { setAuthState } = useAuthState();
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkSignupStatus(setIssignedup, setAssignednickname);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    if (!inputRef.current) return;
    e.preventDefault();
    const nickname = inputRef.current?.value;
    const response = await handleGuestSignin(`익명의 ${nickname}`);
    if (!response.ok) {
      console.error("게스트 로그인에 실패했습니다.");
      return;
    }
    updateQueryClient(queryClient, authQueries.queryKey, (prev) => ({
      ...prev,
      userInfo: {
        role: "guest",
        nickname: nickname,
        duck: 0,
        message: "OK",
        realDuck: prev.userInfo.realDuck,
      },
    }));

    setAuthState((prev) => ({
      ...prev,
      isAuthenticated: true,
      nickname: nickname,
    }));

    if (to && roomId) {
      window.location.href = `/betting/${roomId}/waiting`;
    }

    navigate({
      to: "/my-page",
    });
  };
  return (
    <form onSubmit={handleSubmit} className="mt-3 w-[90%]">
      <div className="bg-layout-sidebar w-full overflow-hidden rounded-lg shadow-inner">
        <div className="flex items-center shadow-md">
          <Input
            ref={inputRef}
            assignednickname={assignednickname}
            issignedup={issignedup}
          />
        </div>
      </div>
      {issignedup && (
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
