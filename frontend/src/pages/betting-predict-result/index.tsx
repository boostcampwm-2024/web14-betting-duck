import { DuckCoinIcon } from "@/assets/icons";

function BettingPredictResult({ outcome }: { outcome: "win" | "lose" }) {
  const winningTeam = "KIA";
  const predictionAmount = 12999;
  const totalParticipants = 69000;
  const totalPoints = 14037161;
  const color = outcome === "win" ? "text-bettingBlue" : "text-bg-bettingPink";

  return (
    <div className="mx-auto w-full rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-6 text-center text-xl font-semibold">예측 결과</h2>

      <div className="mb-4 flex justify-center">
        <DuckCoinIcon className="text-bettingBlue" />
      </div>

      <div className="mb-4 text-center">
        <p className="mb-1 text-gray-600">승부 예측에서 이긴 팀은!!</p>
        <h3 className="text-xl font-bold">{winningTeam}</h3>
      </div>

      <div className={`mb-6 flex flex-col items-center text-center ${color}`}>
        <p className="text-2xl font-bold">이겼습니다! </p>
        <p className="flex flex-row items-center gap-2 text-2xl font-extrabold">
          얻은 포인트는!
          <DuckCoinIcon className="inline h-6 w-6" />
          {predictionAmount.toLocaleString()}!
        </p>
        <p className="mt-2 text-lg text-gray-500">
          {totalParticipants.toLocaleString()} 명에게{" "}
          <DuckCoinIcon className="inline h-4 w-4" />{" "}
          {totalPoints.toLocaleString()} 포인트를 드립니다
        </p>
      </div>

      <div className="flex gap-2">
        <button className="bg-default text-secondary hover:bg-default-hover flex-1 rounded-md py-2 transition-colors">
          돌아가기
        </button>
        <button className="bg-primary hover:bg-primary-hover flex-1 rounded-md py-2 text-white transition-colors">
          결과 자세히 보기
        </button>
      </div>
    </div>
  );
}

export { BettingPredictResult };
