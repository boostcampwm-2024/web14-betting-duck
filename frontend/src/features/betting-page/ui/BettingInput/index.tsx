import { DuckIcon } from "@/shared/icons";
import { cn } from "@/shared/misc";
import React from "react";
import { z } from "zod";
import { useBettingContext } from "../../hook/useBettingContext";
import { responseBetRoomInfo } from "@betting-duck/shared";
import { useSocketIO } from "@/shared/hooks/useSocketIo";
import { useUserContext } from "@/shared/hooks/useUserContext";
import { Route } from "@/routes/betting_.$roomId.vote";

const numberSchema = z.coerce.number().int().positive();

function placeBet(
  socket: ReturnType<typeof useSocketIO>,
  bettingRoomInfo: z.infer<typeof responseBetRoomInfo>,
  value: string,
  uses: "winning" | "losing",
) {
  socket.emit("joinBet", {
    sender: {
      betAmount: parseInt(value),
      selectOption: uses === "winning" ? "option1" : "option2",
    },
    channel: {
      roomId: bettingRoomInfo.channel.id,
    },
  });
}

function errorText(
  isText: boolean,
  isLongText: boolean,
  isOverDuckCoin: boolean,
) {
  if (isOverDuckCoin) return "보유 코인보다 많이 베팅할 수 없어요~";
  if (isLongText) return "최대 입력 수는 10글자에요~";
  if (isText) return "문자 말고 숫자를 입력 해주세요~";
  return "숫자 입력 중";
}

function getVisibleText(
  isText: boolean,
  isLongText: boolean,
  isOverDuckCoin: boolean,
) {
  return `opacity-${isText == true || isLongText == true || isOverDuckCoin == true ? 1 : 0} ${isText == true || isLongText == true || isOverDuckCoin == true ? "visible" : "invisible"}`;
}

function BettingInput({ uses }: { uses: "winning" | "losing" }) {
  const { duckCoin } = Route.useLoaderData();
  const { socket, bettingRoomInfo } = useBettingContext();
  const { setUserInfo, userInfo } = useUserContext();
  const [value, setValue] = React.useState("");
  const [isText, setIsText] = React.useState(false);
  const [isLongText, setIsLongText] = React.useState(false);
  const [isOverDuckCoin, setIsOverDuckCoin] = React.useState(false);
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

    if (parseInt(value) > parseInt(duckCoin)) return setIsOverDuckCoin(true);
    else setIsOverDuckCoin(false);
    if (value.length === 10) return setIsLongText(true);
    else setIsLongText(false);
    const isValidNumber = numberSchema.safeParse(value).success;
    return updateState(isValidNumber ? value : value, !isValidNumber);
  }

  return (
    <div className="relative flex flex-col items-end">
      <div
        className={cn(
          bgColor,
          "relative flex min-h-[45px] w-[90cqw] rounded-lg",
        )}
      >
        <div className="mx-4 flex min-w-[24px] items-center justify-center">
          <DuckIcon width={36} height={36} className="" />
        </div>
        <input
          className={cn(
            inputColor,
            "flex w-full items-center justify-end whitespace-normal break-all p-2 pr-2 text-end text-lg font-extrabold",
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
          disabled={isText || userInfo.isPlaceBet}
          onClick={() => {
            placeBet(socket, bettingRoomInfo, value, uses);
            setUserInfo({ isPlaceBet: true, placeBetAmount: parseInt(value) });
          }}
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
        className={cn(
          getVisibleText(isText, isLongText, isOverDuckCoin),
          `text-md font-bold text-red-600`,
        )}
      >
        {errorText(isText, isLongText, isOverDuckCoin)}
      </p>
    </div>
  );
}

export { BettingInput };
