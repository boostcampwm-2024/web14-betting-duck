import { InputField } from "@/shared/components/input/InputField";
import { LoginIDIcon } from "@/shared/icons";
import { useState } from "react";
import { useAuthStore } from "../../model/store";

function GuestLoginForm() {
  const [nickname, setNickname] = useState("");
  const { handleGuestLogin } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleGuestLogin({ nickname });
  };
  return (
    <form onSubmit={handleSubmit} className="mt-3 w-[90%]">
      <div className="bg-layout-sidebar w-full overflow-hidden rounded-lg shadow-inner">
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
      </div>
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
