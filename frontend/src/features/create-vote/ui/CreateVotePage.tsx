import {
  TextIcon,
  DuckIcon,
  TimerIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@/shared/icons";
import { usePredictionStore } from "../model/store";
import { useNavigate } from "@tanstack/react-router";
import { cn } from "@/shared/misc";
import { useMemo } from "react";

interface InputFieldProps {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  inputClass?: string;
}

function InputField({
  icon,
  placeholder,
  value,
  onChange,
  name,
  inputClass = "text-gray-700",
}: InputFieldProps) {
  return (
    <div className="bg-layout-sidebar flex items-center gap-3 rounded-lg p-4 shadow-inner">
      {icon}
      <div className="border-border h-3 border-l"></div>
      <input
        type="text"
        placeholder={placeholder}
        className={cn(
          "text-md w-full border-none bg-transparent outline-none",
          inputClass,
        )}
        value={value}
        onChange={onChange}
        name={name}
      />
    </div>
  );
}

function CreateVotePage() {
  const {
    formState,
    handleInputChange,
    isFormVaild,
    submitPrediction,
    handleTimerIncrement,
    handleTimerDecrement,
    handleDefaultBetAmountChange,
    incrementDefaultBetAmount,
    decrementDefaultBetAmount,
  } = usePredictionStore();
  const navigate = useNavigate();

  const handleCancelClick = () => {
    navigate({ to: "/my-page" });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    submitPrediction();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const titleIcon = useMemo(() => <TextIcon />, []);
  const winIcon = useMemo(() => <DuckIcon color="#4C79F8" />, []);
  const loseIcon = useMemo(() => <DuckIcon color="#DF3491" />, []);
  const timerIcon = useMemo(() => <TimerIcon />, []);
  const arrowUpIcon = useMemo(() => <ArrowUpIcon />, []);
  const arrowDownIcon = useMemo(() => <ArrowDownIcon />, []);

  return (
    <form
      className="bg-layout-main flex w-full flex-col items-center gap-4 p-9"
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
    >
      <h1 className="text-default my-8 text-xl font-extrabold">
        승부 예측 생성하기
      </h1>
      <div className="w-full">
        <InputField
          icon={titleIcon}
          placeholder="승부를 예측할 제목을 입력해 주세요."
          value={formState.title}
          onChange={handleInputChange}
          name="title"
        />
      </div>

      <div className="bg-layout-sidebar w-full rounded-lg shadow-inner">
        <InputField
          icon={winIcon}
          placeholder="승리에 해당하는 예측 케이스를 적어주세요."
          value={formState.winCase}
          onChange={handleInputChange}
          name="winCase"
          inputClass="text-bettingBlue placeholder-bettingBlue"
        />
        <div className="border-border border-t"></div>
        {/* 패배 예측 케이스 입력 */}
        <InputField
          icon={loseIcon}
          placeholder="패배에 해당하는 예측 케이스를 적어주세요."
          value={formState.loseCase}
          onChange={handleInputChange}
          name="loseCase"
          inputClass="text-bettingPink placeholder-bettingPink"
        />
      </div>

      <div className="flex w-full gap-2">
        <div className="bg-layout-sidebar flex w-1/2 items-center justify-between gap-1 rounded-lg pl-2 shadow-inner">
          <div className="flex items-center gap-1">
            {timerIcon}
            <span className="text-md text-default">타이머 설정</span>
            <div className="border-border h-3 border-l"></div>
            <span className="text-default ml-2 text-lg font-bold">
              {formState.timer}분
            </span>
          </div>
          {/* <input className=""></input> */}
          <div className="bg-primary flex flex-col items-center justify-center rounded-r-lg p-1">
            <button type="button" onClick={handleTimerIncrement}>
              {arrowUpIcon}
            </button>
            <div className="my-1 w-full border-t border-[#F0F4FA2B]" />
            <button type="button" onClick={handleTimerDecrement}>
              {arrowDownIcon}
            </button>
          </div>
        </div>
        <div className="bg-layout-sidebar flex w-1/2 items-center justify-between gap-1 rounded-lg pl-2 shadow-inner">
          <div className="flex items-center gap-1">
            <DuckIcon width={10} height={10} color="#4D5765" />
            <span className="text-md text-default">최소 금액 설정</span>
            <div className="border-border h-3 border-l"></div>
            <input
              type="number"
              value={formState.defaultBetAmount}
              onChange={handleDefaultBetAmountChange}
              className="text-default w-1/3 border-none bg-transparent text-center text-lg font-bold outline-none"
              min="100"
            />
          </div>
          {/* <input className=""></input> */}
          <div className="bg-primary flex flex-col items-center justify-center rounded-r-lg p-1">
            <button type="button" onClick={incrementDefaultBetAmount}>
              {arrowUpIcon}
            </button>
            <div className="my-1 w-full border-t border-[#F0F4FA2B]" />
            <button type="button" onClick={decrementDefaultBetAmount}>
              {arrowDownIcon}
            </button>
          </div>
        </div>
      </div>
      <div className="flex w-full gap-2">
        <button
          className="bg-secondary hover:bg-secondary-hover shadow-middle text-default w-1/2 rounded-lg px-8 py-4 font-semibold hover:text-white"
          onClick={handleCancelClick}
        >
          취소
        </button>
        <button
          type="submit"
          className="bg-primary hover:bg-primary-hover disabled:bg-primary-disabled shadow-middle w-1/2 rounded-lg px-8 py-4 font-semibold text-white"
          disabled={!isFormVaild}
        >
          생성
        </button>
      </div>
    </form>
  );
}

export { CreateVotePage };
