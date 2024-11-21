import { InputField } from "@/shared/components/input/InputField";
import { LoginIDIcon, LoginPasswordIcon } from "@/shared/icons";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../model/store";
import { validateEmail, validatePassword } from "../../model/validation";
import { Warning } from "./Warning";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);

  const { handleLogin, error } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 로그인 로직
    await handleLogin({ email, password });
  };

  useEffect(() => {
    if (validateEmail(email) && validatePassword(password)) {
      setIsValid(true);
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
            <LoginIDIcon />
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
