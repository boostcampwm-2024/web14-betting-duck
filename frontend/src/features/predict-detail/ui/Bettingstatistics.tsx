import { ProgressBar } from "@/shared/components/ProgressBar";
import { PeoplesIcon } from "@/shared/icons";
import { bettinResultSchema } from "../model/schema";
import { z } from "zod";
import { responseBetRoomInfo } from "@betting-duck/shared";

function BettingStatistics({
  betResults,
  channel,
}: {
  betResults: z.infer<typeof bettinResultSchema>;
  channel: z.infer<typeof responseBetRoomInfo>["channel"];
}) {
  const getTotalParticipants = () =>
    Number(betResults.option_1_total_participants) +
    Number(betResults.option_2_total_participants);

  return (
    <div className="bg-secondary w-[90cqw] rounded-lg px-8 py-4 shadow-inner">
      <div className="flex flex-row items-center gap-2 text-lg font-extrabold">
        <h2>베팅 통계</h2>
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
              {betResults.option_1_total_participants}명
            </span>
          </div>
          <ProgressBar
            max={getTotalParticipants()}
            value={betResults.option_1_total_participants}
            uses={"winning"}
            label="승리에 참여한 사용자 비율"
          />
        </div>
        <div>
          <div className="flex justify-between font-extrabold">
            <span className="font-bold">{channel.options.option2.name}</span>
            <span>{betResults.option_2_total_participants}명</span>
          </div>
          <ProgressBar
            max={getTotalParticipants()}
            value={betResults.option_2_total_participants}
            uses={"losing"}
            label="패배에 참여한 사용자 비율"
          />
        </div>
      </div>
    </div>
  );
}

export { BettingStatistics };
