import { InputField } from "@/shared/components/input/InputField";
import { LoginIDIcon, LoginPasswordIcon } from "@/shared/icons";
import { cn } from "@/shared/misc";
import React, { useState } from "react";
import mainLogo from "@/assets/images/main-logo.png";

function LoginPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register" | "guest">(
    "login",
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleTabChange = (tab: "login" | "register" | "guest") => {
    setActiveTab(tab);
    setEmail("");
    setPassword("");
    setNickname("");
    setConfirmPassword("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="bg-layout-main flex w-full flex-col items-center p-8">
      <div className="mt-4 text-center">
        <h1 className="text-default text-xl font-extrabold">로그인</h1>
        <p className="text-default">오리를 구매해서 페이지를 꾸며보세요</p>
      </div>
      <img src={mainLogo} alt="Main Logo" className="mb-3" />
      <div className="bg-layout-sidebar relative flex w-[90%] overflow-hidden rounded-full text-[#7A8495] shadow-inner">
        <div
          className={cn(
            "bg-default absolute h-full w-1/3 transition-transform duration-300",
            activeTab === "login" && "translate-x-0",
            activeTab === "register" && "translate-x-full",
            activeTab === "guest" && "translate-x-[200%]",
          )}
        />
        <button
          className={cn(
            "z-10 flex-1 px-6 py-1 transition-colors duration-300",
            activeTab === "login" ? "text-white" : "text-[#7A8495]",
          )}
          onClick={() => handleTabChange("login")}
        >
          로그인
        </button>
        <button
          className={cn(
            "z-10 flex-1 px-6 py-1 transition-colors duration-300",
            activeTab === "register" ? "text-white" : "text-[#7A8495]",
          )}
          onClick={() => handleTabChange("register")}
        >
          회원가입
        </button>
        <button
          className={cn(
            "z-10 flex-1 px-6 py-1 transition-colors duration-300",
            activeTab === "guest" ? "text-white" : "text-[#7A8495]",
          )}
          onClick={() => handleTabChange("guest")}
        >
          비회원
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-3 w-[90%]">
        <div className="bg-layout-sidebar w-full overflow-hidden rounded-lg shadow-inner">
          {activeTab !== "guest" && (
            <div className="flex items-center shadow-md">
              <InputField
                id="email"
                placeholder="이메일을 입력해주세요."
                name="email"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              >
                <LoginIDIcon />
              </InputField>
            </div>
          )}
          {activeTab === "register" && (
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
          )}
          {activeTab === "guest" && (
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
          )}
          {activeTab !== "guest" && (
            <div className="flex items-center shadow-md">
              <InputField
                id="password"
                placeholder="비밀번호를 입력해주세요."
                name="password"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              >
                <LoginPasswordIcon />
              </InputField>
            </div>
          )}
          {activeTab === "register" && (
            <div className="flex items-center shadow-md">
              <InputField
                id="confirm_password"
                placeholder="비밀번호를 한 번 더 입력해주세요."
                name="confirm_password"
                value={confirmPassword}
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              >
                <LoginPasswordIcon />
              </InputField>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-default disabled:bg-default-disabled hover:bg-default-hover shadow-middle mt-3 w-full rounded-md py-2 text-white"
        >
          {activeTab === "login" && "로그인"}
          {activeTab === "register" && "회원가입"}
          {activeTab === "guest" && "로그인"}
        </button>
      </form>
    </div>
  );
}

export { LoginPage };
