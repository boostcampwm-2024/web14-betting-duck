import {
  TextIcon,
  DuckIcon,
  TimerIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@/shared/icons";
import { usePredictionStore } from "../model/store";
import { useNavigate } from "@tanstack/react-router";

function CreateVotePage() {
  const { formState, handleInputChange, isFormVaild, submitPrediction } =
    usePredictionStore();
  const navigate = useNavigate();

  const handleCancelClick = () => {
    navigate({ to: "/my-page" });
  };

  return (
    <div className="bg-layout-main flex w-full flex-col items-center gap-4 p-9">
      <h1 className="text-default my-8 text-xl font-extrabold">
        승부 예측 생성하기
      </h1>

      {/* 예측 제목 입력 */}
      <div className="w-full">
        <div className="bg-layout-sidebar flex items-center gap-3 rounded-lg p-4 shadow-inner">
          <TextIcon />
          <div className="border-border h-3 border-l"></div>
          <input
            type="text"
            placeholder="승부를 예측할 제목을 입력해 주세요."
            className="text-md w-full border-none bg-transparent text-gray-700 outline-none"
            value={formState.title}
            onChange={handleInputChange}
            name="title"
          />
        </div>
      </div>

      <div className="bg-layout-sidebar w-full rounded-lg shadow-inner">
        {/* 승리 예측 케이스 입력 */}
        <div className="flex items-center gap-3 border-b border-gray-200 p-4">
          <DuckIcon color="#4C79F8" />
          <div className="border-bettingBlue h-3 border-l"></div>
          <input
            type="text"
            placeholder="승리에 해당하는 예측 케이스를 적어주세요."
            className="text-bettingBlue placeholder-bettingBlue text-md w-full border-none bg-transparent outline-none"
            value={formState.winCase}
            onChange={handleInputChange}
            name="winCase"
          />
        </div>
        <div className="border-border border-t"></div>
        {/* 패배 예측 케이스 입력 */}
        <div className="flex items-center gap-3 p-4">
          <DuckIcon color="#DF3491" />
          <div className="border-bettingPink h-3 border-l"></div>
          <input
            type="text"
            placeholder="패배에 해당하는 예측 케이스를 적어주세요."
            className="text-bettingPink placeholder-bettingPink text-md w-full border-none bg-transparent outline-none"
            value={formState.loseCase}
            onChange={handleInputChange}
            name="loseCase"
          />
        </div>
      </div>

      {/* 타이머 및 최소 금액 설정 */}
      <div className="flex w-full gap-2">
        {/* 타이머 설정 */}
        <div className="bg-layout-sidebar flex w-1/2 items-center justify-between gap-1 rounded-lg pl-2 shadow-inner">
          <div className="flex items-center gap-1">
            <TimerIcon />
            <span className="text-md text-default">타이머 설정</span>
            <div className="border-border h-3 border-l"></div>
          </div>
          {/* <input className=""></input> */}
          <div className="bg-primary flex flex-col items-center justify-center rounded-r-lg p-1">
            <button>
              <ArrowUpIcon />
            </button>
            <div className="my-1 w-full border-t border-[#F0F4FA2B]" />
            <button>
              <ArrowDownIcon />
            </button>
          </div>
        </div>

        {/* 최소 금액 설정 */}
        <div className="bg-layout-sidebar flex w-1/2 items-center justify-between gap-1 rounded-lg pl-2 shadow-inner">
          <div className="flex items-center gap-1">
            <DuckIcon width={10} height={10} color="#4D5765" />
            <span className="text-md text-default">최소 금액 설정</span>
            <div className="border-border h-3 border-l"></div>
          </div>
          {/* <input className=""></input> */}
          <div className="bg-primary flex flex-col items-center justify-center rounded-r-lg p-1">
            <button>
              <ArrowUpIcon />
            </button>
            <div className="my-1 w-full border-t border-[#F0F4FA2B]" />
            <button>
              <ArrowDownIcon />
            </button>
          </div>
        </div>
      </div>

      {/* 취소 및 투표 생성 버튼 */}
      <div className="flex w-full gap-2">
        <button
          className="bg-secondary hover:bg-secondary-hover shadow-middle text-default w-1/2 rounded-lg px-8 py-4 font-semibold hover:text-white"
          onClick={handleCancelClick}
        >
          취소
        </button>
        <button
          className="bg-primary hover:bg-primary-hover disabled:bg-primary-disabled shadow-middle w-1/2 rounded-lg px-8 py-4 font-semibold text-white"
          disabled={!isFormVaild}
          onClick={submitPrediction}
        >
          생성
        </button>
      </div>
    </div>
  );
}

export { CreateVotePage };
