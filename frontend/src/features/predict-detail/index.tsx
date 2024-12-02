import { PeoplesIcon, DuckCoinIcon, TrophyIcon } from "@/shared/icons";
import { ProgressBar } from "@/shared/components/ProgressBar";
import { UserFooter } from "./ui/UserFooter";
import { useBettingContext } from "../betting-page/hook/useBettingContext";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/provider/UserProvider";
import { GuestFooter } from "./ui/GuestFooter";
import { BettingResult } from "./ui/UserBettingResult";
import { AdminBettingResult } from "./ui/AdminBettingResult";
import { useLayoutShift } from "@/shared/hooks/useLayoutShift";

interface BetResultResponse {
  status: number;
  data: {
    option_1_total_bet: string;
    option_2_total_bet: string;
    option_1_total_participants: string;
    option_2_total_participants: string;
    winning_option: "option1" | "option2";
    message: string;
  };
  error?: string;
}

function PredictDetail() {
  useLayoutShift();
  const { bettingRoomInfo } = useBettingContext();
  const { channel } = bettingRoomInfo;
  const [betResults, setBetResults] = useState<BetResultResponse>({
    status: 200,
    data: {
      option_1_total_bet: "0",
      option_2_total_bet: "0",
      option_1_total_participants: "0",
      option_2_total_participants: "0",
      winning_option: "option1",
      message: "Loading...",
    },
  });
  const userContext = useContext(UserContext);
  const { role } = userContext?.userInfo || {};

  useEffect(() => {
    const fetchBetResults = async () => {
      try {
        const response = await fetch(`/api/betresults/${channel.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data: BetResultResponse = await response.json();

        if (response.ok) {
          console.log(data);
          setBetResults(data);
        } else {
          console.log(data.error);
        }
      } catch (err) {
        console.error("Error fetching bet results:", err);
      }
    };

    fetchBetResults();
  }, [channel.id]);

  // Utility functions
  const getWinningOptionName = () =>
    channel.options[betResults.data.winning_option].name;

  const getTotalParticipants = () =>
    Number(betResults.data.option_1_total_participants) +
    Number(betResults.data.option_2_total_participants);

  const renderWinningIcon = () => (
    <DuckCoinIcon
      className={
        betResults.data.winning_option === "option1"
          ? "text-bettingBlue"
          : "text-bettingPink"
      }
      width={24}
      height={24}
    />
  );

  return (
    <div className="bg-layout-main flex h-full w-full flex-col items-center justify-between gap-4">
      {/* PredictDetail Header */}
      <div className="bg-primary shadow-middle flex w-[90cqw] flex-col items-center justify-center rounded-2xl px-4 py-4">
        <div className="text-layout-main text-lg font-extrabold">
          <span>{channel.title}</span>
        </div>
        <h1 className="text-layout-main flex items-center gap-4 text-2xl font-extrabold">
          <TrophyIcon className="font-extrabold" width={32} height={32} />
          승리 : {getWinningOptionName()}
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
            <span>{getTotalParticipants()}명</span>
          </div>
          <div>
            <div className="flex justify-between">
              <span className="font-bold">{channel.options.option1.name}</span>
              <span className="font-extrabold">
                {betResults.data.option_1_total_participants}명
              </span>
            </div>
            <ProgressBar
              max={getTotalParticipants()}
              value={Number(betResults.data.option_1_total_participants)}
              uses={"winning"}
              label="승리에 참여한 사용자 비율"
            />
          </div>
          <div>
            <div className="flex justify-between font-extrabold">
              <span className="font-bold">{channel.options.option2.name}</span>
              <span>{betResults.data.option_2_total_participants}명</span>
            </div>
            <ProgressBar
              max={getTotalParticipants()}
              value={Number(betResults.data.option_2_total_participants)}
              uses={"losing"}
              label="패배에 참여한 사용자 비율"
            />
          </div>
        </div>
      </div>

      {/* PredictDetail result */}
      {role === "admin" ? (
        <AdminBettingResult
          winningOption="option1"
          winner={getWinningOptionName()}
          winnerCount={Number(betResults.data.option_1_total_participants)}
        />
      ) : (
        <BettingResult
          renderWinningIcon={renderWinningIcon}
          winningOption={betResults.data.winning_option}
          options={channel.options}
          earnedAmount={300}
        />
      )}

      {/* PredictDetail footer */}
      <div className="flex w-[90cqw] flex-col gap-2 pt-8">
        {role === "guest" ? <GuestFooter /> : <UserFooter />}
      </div>
      <div className="h-[60px] w-[100cqw] bg-[#e6edf8]" />
    </div>
  );
}

export { PredictDetail };
