// Input.tsx
import { forwardRef, useState } from "react";
import { LoginIDIcon } from "@/shared/icons";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  assignednickname: string;
  issignedup: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { assignednickname, issignedup, ...rest } = props;
  const [nickname, setNickname] = useState(assignednickname);

  return (
    <label htmlFor="nickname" className="flex w-full items-center gap-2 p-4">
      <div className="flex-shrink-0">
        <LoginIDIcon />
      </div>
      <div className="border-border h-3 border-l"></div>
      <div className="text-md text-default-disabled w-[15%] font-bold">
        익명의{" "}
      </div>
      <input
        {...rest}
        ref={ref}
        id="nickname"
        type="text"
        placeholder="닉네임을 입력해주세요. (1글자 이상 10글자 이하)"
        className={`text-md w-full border-none bg-transparent outline-none ${issignedup ? "text-default-disabled font-extrabold" : "text-default"}`}
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        name="nickname"
        readOnly={issignedup}
      />
    </label>
  );
});

export { Input };
