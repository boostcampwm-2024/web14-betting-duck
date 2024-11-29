import { DuckCoinIcon } from "@/shared/icons";

interface BettingResultProps {
  renderWinningIcon: () => React.ReactNode;
  winningOption: "option1" | "option2";
  options: {
    option1: { name: string };
    option2: { name: string };
  };
  earnedAmount: number; // 얻은 금액
}

export const BettingResult: React.FC<BettingResultProps> = ({
  renderWinningIcon,
  winningOption,
  options,
  earnedAmount,
}) => {
  return (
    <div className="bg-secondary w-[90cqw] rounded-lg px-8 py-4 shadow-inner">
      <div>
        <h2 className="flex flex-row items-center gap-2 text-lg font-extrabold">
          배팅 결과
        </h2>
      </div>
      <div className="flex flex-col gap-2 pt-4">
        <div className="flex justify-between">
          <div className="flex flex-row items-center gap-2">
            {renderWinningIcon()} 배팅 금액
          </div>
          <span className="text-default font-extrabold">300 포인트</span>
        </div>
        <div className="flex justify-between">
          <span>선택 옵션</span>
          {winningOption === "option1" ? (
            <span className="text-bettingBlue font-extrabold">
              {options.option1.name}
            </span>
          ) : (
            <span className="text-bettingPink font-extrabold">
              {options.option2.name}
            </span>
          )}
        </div>
        <div className="flex justify-between">
          <span>얻은 금액</span>
          {winningOption === "option1" ? (
            <div className="text-bettingBlue flex flex-row gap-2 font-extrabold">
              <DuckCoinIcon
                className="text-bettingBlue"
                width={24}
                height={24}
              />
              + {earnedAmount} 코인
            </div>
          ) : (
            <div className="text-bettingPink flex flex-row gap-2 font-extrabold">
              <DuckCoinIcon
                className="text-bettingPink"
                width={24}
                height={24}
              />
              + {earnedAmount} 코인
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
