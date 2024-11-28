import { ProgressBar } from "@/shared/components/ProgressBar";
import { PeoplesIcon } from "@/shared/icons";

function BettingStatistics() {
  return (
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
  );
}

export { BettingStatistics };
