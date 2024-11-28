import { PeoplesIcon, DuckCoinIcon, TrophyIcon } from "@/shared/icons";
import { ProgressBar } from "@/shared/components/ProgressBar";
import { UserFooter } from "./ui/UserFooter";
import { useBettingContext } from "../betting-page/hook/useBettingContext";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/provider/UserProvider";
import { GuestFooter } from "./ui/GuestFooter";

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
  }, []);

  return (
    <div className="bg-layout-main flex h-full w-full flex-col items-center justify-between gap-4">
      {/* PredictDetail Header */}
      <div className="bg-primary shadow-middle flex w-[90cqw] flex-col items-center justify-center rounded-2xl px-4 py-4">
        <div className="text-layout-main text-lg font-extrabold">
          <span>{channel.title}</span>
        </div>
        <h1 className="text-layout-main flex items-center gap-4 text-2xl font-extrabold">
          <TrophyIcon className="font-extrabold" width={32} height={32} />
          승리 : {channel.options[betResults.data.winning_option].name}
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
            <span>
              {betResults.data.option_1_total_participants +
                betResults.data.option_2_total_participants}
              명
            </span>
          </div>
          <div>
            <div className="flex justify-between">
              <span className="font-bold">{channel.options.option1.name}</span>
              <span className="font-extrabold">
                {betResults.data.option_1_total_participants}명
              </span>
            </div>
            <ProgressBar
              max={Number(
                betResults.data.option_1_total_participants +
                  betResults.data.option_2_total_participants,
              )}
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
              max={Number(
                betResults.data.option_1_total_participants +
                  betResults.data.option_2_total_participants,
              )}
              value={Number(betResults.data.option_2_total_participants)}
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
              {betResults.data.winning_option === "option1" ? (
                <DuckCoinIcon
                  className="text-bettingBlue"
                  width={24}
                  height={24}
                />
              ) : (
                <DuckCoinIcon
                  className="text-bettingPink"
                  width={24}
                  height={24}
                />
              )}
              배팅 금액
            </div>
            <span className="text-default font-extrabold">300 포인트</span>
          </div>
          <div className="flex justify-between">
            <span>선택 옵션</span>
            {betResults.data.winning_option === "option1" ? (
              <span className="text-bettingBlue font-extrabold">
                {channel.options.option1.name}
              </span>
            ) : (
              <span className="text-bettingPink font-extrabold">
                {channel.options.option2.name}
              </span>
            )}
          </div>
          <div className="flex justify-between">
            <span>얻은 금액</span>
            {betResults.data.winning_option === "option1" ? (
              <div className="text-bettingBlue flex flex-row gap-2 font-extrabold">
                <DuckCoinIcon
                  className="text-bettingBlue"
                  width={24}
                  height={24}
                />
                + 300 코인
              </div>
            ) : (
              <div className="text-bettingPink flex flex-row gap-2 font-extrabold">
                <DuckCoinIcon
                  className="text-bettingPink"
                  width={24}
                  height={24}
                />
                + 300 코인
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PredictDetail footer */}
      <div className="flex w-[90cqw] flex-col gap-2 pt-8">
        {role === "guest" ? <GuestFooter /> : <UserFooter />}
      </div>
      <div className="h-[60px] w-[100cqw] bg-[#e6edf8]" />
    </div>
  );
}

export { PredictDetail };
