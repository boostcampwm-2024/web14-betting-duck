function BettingDetails({
  title,
  defaultBetAmount,
  timer,
  status,
}: {
  title: string;
  defaultBetAmount: number;
  timer: number;
  status: string;
}) {
  return (
    <div className="bg-secondary mb-4 rounded-lg p-3 text-center shadow-inner">
      <h1 className="text-default-disabled text-md mb-1 font-bold">
        베팅 주제
      </h1>
      <h1 className="text-primary mb-1 pt-2 text-4xl font-extrabold">
        {title}
      </h1>
      <p>
        {status === "active"
          ? "투표가 진행 중입니다. 투표를 취소할 수 있습니다."
          : "투표가 종료되었습니다. 승부를 결정하세요!"}
      </p>
      <h1 className="text-default-disabled text-md mb-1 font-bold">
        베팅 정보
      </h1>
      <p>
        ∙ 최소 베팅 금액:{" "}
        <span className="font-extrabold">{defaultBetAmount}</span>
      </p>
      <p>
        ∙ 설정한 시간: <span className="font-extrabold">{timer / 60}분</span>
      </p>
    </div>
  );
}

export default BettingDetails;
