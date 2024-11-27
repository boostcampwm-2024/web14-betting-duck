import { DuckIcon } from "@/shared/icons";
import { cn } from "@/shared/misc";
import React from "react";
import { z } from "zod";

const numberSchema = z.coerce.number().int().positive();

function BettingInput({ uses }: { uses: "winning" | "losing" }) {
  const [value, setValue] = React.useState("");
  const [isText, setIsText] = React.useState(false);
  const [isLongText, setIsLongText] = React.useState(false);
  const bgColor =
    uses === "winning"
      ? "bg-bettingBlue-behind text-bettingBlue"
      : "bg-bettingPink-disabled text-bettingPink";
  const inputColor =
    uses === "winning" ? "bg-bettingBlue-behind" : "bg-bettingPink-disabled";
  const buttonColor =
    uses === "winning"
      ? "bg-bettingBlue disabled:bg-blue-950"
      : "bg-bettingPink disabled:bg-pink-950";

  const updateState = (newValue: string, newIsText: boolean) => {
    setValue(newValue);
    setIsText(newIsText);
  };

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (value === "") {
      return updateState("", false);
    }

    if (value.length === 10) setIsLongText(true);
    else setIsLongText(false);
    const isValidNumber = numberSchema.safeParse(value).success;
    return updateState(isValidNumber ? value : value, !isValidNumber);
  }

  return (
    <div className="relative flex flex-col items-end">
      <div
        className={cn(
          bgColor,
          "relative flex min-h-[65px] w-[50cqw] rounded-lg",
        )}
      >
        <div className="mx-4 flex min-w-[24px] items-center justify-center">
          <DuckIcon width={36} height={36} className="" />
        </div>
        <input
          className={cn(
            inputColor,
            "flex w-full items-center justify-end whitespace-normal break-all pr-2 text-end text-lg font-extrabold",
          )}
          type="text"
          pattern={"[0-9]*"}
          placeholder="베팅 금액을 입력하세요"
          value={value}
          onChange={handleOnChange}
          maxLength={10}
          minLength={1}
          aria-label="베팅 금액 입력"
          inputMode="numeric"
        />
        <button
          disabled={isText}
          type="button"
          className={cn(
            buttonColor,
            "relative z-10 min-w-[74px] rounded-lg py-2 text-white outline-none transition-all disabled:cursor-not-allowed",
          )}
        >
          투표
        </button>
      </div>
      <p
        className={`pt-2 font-bold text-red-600 opacity-${isText == true || isLongText == true ? 1 : 0} ${isText == true || isLongText == true ? "visible" : "invisible"}`}
      >
        {isLongText
          ? "최대 입력 수는 10글자에요~"
          : "문자 말고 숫자를 입력 해주세요~"}
      </p>
    </div>
  );
}

export { BettingInput };
