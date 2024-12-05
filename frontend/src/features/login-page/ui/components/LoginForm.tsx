import { InputField } from "@/shared/components/input/InputField";
import { EmailIcon, LoginPasswordIcon } from "@/shared/icons";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../model/store";
import { Warning } from "./Warning";
import { useNavigate } from "@tanstack/react-router";
import { useUserContext } from "@/shared/hooks/useUserContext";
import { useUpdateUserStatus } from "@/shared/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { authQueries } from "@/shared/lib/auth/authQuery";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();
  const { setUserInfo } = useUserContext();
  const { error, handleLogin } = useAuthStore();
  const { updateAuthStatus } = useUpdateUserStatus();
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await handleLogin({ email, password });
    if (result.success) {
      const { data } = result.data;
      setUserInfo({
        role: "user",
        nickname: data.nickname,
        isAuthenticated: true,
      });

      updateAuthStatus(true, {
        role: "user",
        nickname: data.nickname,
        duck: 0,
        message: "OK",
      });
      await queryClient.invalidateQueries({ queryKey: authQueries.queryKey });
      navigate({
        to: "/my-page",
        search: {
          nickname: decodeURIComponent(data.nickname),
        },
      });
    } else {
      console.error("로그인 실패:", result.error);
    }
  };

  useEffect(() => {
    if (email.length > 0 && password.length > 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [email, password]);

  return (
    <form onSubmit={handleSubmit} className="mt-3 w-[90%]">
      <div className="bg-layout-sidebar w-full overflow-hidden rounded-lg shadow-inner">
        <div className="flex items-center shadow-md">
          <InputField
            id="email"
            placeholder="이메일을 입력해주세요."
            name="email"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          >
            <EmailIcon />
          </InputField>
        </div>
        <div className="flex items-center shadow-md">
          <InputField
            id="password"
            placeholder="비밀번호를 입력해주세요."
            name="password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          >
            <LoginPasswordIcon />
          </InputField>
        </div>
      </div>
      {error && <Warning message={error} />}
      <button
        type="submit"
        className="bg-default disabled:bg-default-disabled hover:bg-default-hover shadow-middle mt-3 w-full rounded-md py-2 text-white"
        disabled={!isValid}
      >
        로그인
      </button>
    </form>
  );
}

export { LoginForm };
