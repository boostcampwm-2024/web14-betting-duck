import { InputField } from "@/shared/components/input/InputField";
import { LoginIDIcon, LoginPasswordIcon } from "@/shared/icons";
import { useState } from "react";
import { useAuthStore } from "../../model/store";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { handleSignup } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await handleSignup({ email, nickname, password });
  };

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
            id="nickname"
            placeholder="닉네임을 입력해주세요."
            name="nickname"
            value={nickname}
            type="text"
            onChange={(e) => setNickname(e.target.value)}
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
            autoComplete="new-password"
          >
            <LoginPasswordIcon />
          </InputField>
        </div>
        <div className="flex items-center shadow-md">
          <InputField
            id="confirm_password"
            placeholder="비밀번호를 한 번 더 입력해주세요."
            name="confirm_password"
            value={confirmPassword}
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
          >
            <LoginPasswordIcon />
          </InputField>
        </div>
      </div>
      <button
        type="submit"
        className="bg-default disabled:bg-default-disabled hover:bg-default-hover shadow-middle mt-3 w-full rounded-md py-2 text-white"
      >
        회원가입
      </button>
    </form>
  );
}

export { RegisterForm };