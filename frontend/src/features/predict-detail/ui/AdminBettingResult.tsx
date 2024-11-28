interface BettingResultAdminProps {
  winningOption: "option1" | "option2";
  winner: string;
  winnerCount: number;
}
function AdminBettingResult({
  winningOption,
  winner,
  winnerCount,
}: BettingResultAdminProps) {
  return (
    <div className="bg-secondary w-[90cqw] rounded-lg px-8 py-4 shadow-inner">
      <div>
        <h2 className="flex flex-row items-center gap-2 text-lg font-extrabold">
          배팅 결과(관리자)
        </h2>
      </div>
      <div className="flex flex-col gap-2 pt-4">
        <div className="flex justify-between">
          <div className="flex flex-row items-center gap-2">승리 팀</div>
          {winningOption === "option1" ? (
            <span className="text-bettingBlue font-extrabold">{winner}</span>
          ) : (
            <span className="text-bettingPink font-extrabold">{winner}</span>
          )}
        </div>
        <div className="flex justify-between">
          <span>승리 팀이 얻은 포인트</span>
          <span>{winnerCount * 100}</span>
        </div>
        <div className="flex justify-between">
          <span>승리 인원</span>
          <span>{winnerCount}명</span>
        </div>
      </div>
    </div>
  );
}

export { AdminBettingResult };
