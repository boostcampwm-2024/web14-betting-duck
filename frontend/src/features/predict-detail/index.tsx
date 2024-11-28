import { PeoplesIcon, DuckCoinIcon, TrophyIcon } from "@/shared/icons";
import { ProgressBar } from "@/shared/components/ProgressBar";
import { UserFooter } from "./ui/UserFooter";

function PredictDetail() {
  return (
    <div className="bg-layout-main flex h-full w-full flex-col items-center justify-between gap-4">
      {/* PredictDetail Header */}
      <div className="bg-primary shadow-middle flex w-[90cqw] flex-col items-center justify-center rounded-2xl px-4 py-4">
        <div className="text-layout-main text-lg font-extrabold">
          <span>KBO 우승은 KIA다!</span>
        </div>
        <h1 className="text-layout-main flex items-center gap-4 text-2xl font-extrabold">
          <TrophyIcon className="font-extrabold" width={32} height={32} />
          승리 : KIA
        </h1>
      </div>

      {/* PredictDetail statistics */}
      <div className="bg-secondary w-[90cqw] rounded-lg px-8 py-4 shadow-inner">
        <div className="flex flex-row items-center gap-2 text-lg font-extrabold">
          <h2>배팅 통계</h2>
        </div>
        <div>
          <div className="flex justify-between font-extrabold">
            <div className="flex flex-row items-center gap-2">
              <PeoplesIcon className="text-default" />총 참여자
            </div>
            <span>159 명</span>
          </div>
          <div>
            <div className="flex justify-between">
              <span className="font-bold">KIA</span>
              <span className="font-extrabold">89명</span>
            </div>
            <ProgressBar
              max={159}
              value={89}
              uses={"winning"}
              label="승리에 참여한 사용자 비율"
            />
          </div>
          <div>
            <div className="flex justify-between font-extrabold">
              <span className="font-bold">삼성</span>
              <span>70명</span>
            </div>
            <ProgressBar
              max={159}
              value={50}
              uses={"losing"}
              label="패배에 참여한 사용자 비율"
            />
          </div>
        </div>
      </div>

      {/* PredictDetail result */}
      <div className="bg-secondary w-[90cqw] rounded-lg px-8 py-4 shadow-inner">
        <div>
          <h2 className="flex flex-row items-center gap-2 text-lg font-extrabold">
            배팅 결과
          </h2>
        </div>
        <div className="flex flex-col gap-2 pt-4">
          <div className="flex justify-between">
            <div className="flex flex-row items-center gap-2">
              <DuckCoinIcon
                className="text-bettingBlue"
                width={24}
                height={24}
              />
              배팅 금액
            </div>
            <span className="text-default font-extrabold">300 포인트</span>
          </div>
          <div className="flex justify-between">
            <span>선택 옵션</span>
            <span className="text-bettingBlue font-extrabold">KIA</span>
          </div>
          <div className="flex justify-between">
            <span>얻은 금액</span>
            <div className="text-bettingBlue flex flex-row gap-2 font-extrabold">
              <DuckCoinIcon
                className="text-bettingBlue"
                width={24}
                height={24}
              />
              + 300 코인
            </div>
          </div>
        </div>
      </div>

      {/* PredictDetail footer */}
      <div className="flex w-[90cqw] flex-col gap-2 pt-8">
        <UserFooter />
        {/* {userType === "user" ? <UserFooter /> : <GuestFooter />} */}
      </div>
      <div className="h-[60px] w-[100cqw] bg-[#e6edf8]" />
    </div>
  );
}

export { PredictDetail };
