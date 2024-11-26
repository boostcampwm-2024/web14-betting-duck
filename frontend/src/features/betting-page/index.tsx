import { ProgressBar } from "@/shared/components/ProgressBar";
import { BettingProvider } from "./provider/BettingProvider";
import { BettingContainer } from "./ui/BettingContainer";
import { useBettingContext } from "./hook/use-betting-context";
import React from "react";
import { TimerIcon } from "@/shared/icons";

function BettingPage() {
  return (
    <BettingProvider>
      <BettingTimer />
      <BettingContainer />
    </BettingProvider>
  );
}

export { BettingPage };

function BettingTimer() {
  const [remainingTime, setRemainingTime] = React.useState(0);
  const [timerActive, setTimerActive] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const { bettingRoomInfo, socket } = useBettingContext();
  const { endAt, startAt } = bettingRoomInfo.channel.metadata;
  const endTime = endAt ? new Date(endAt).getTime() : Date.now();
  const startTime = startAt ? new Date(startAt).getTime() : Date.now();
  const enteredTime = Date.now();

  React.useEffect(() => {
    socket.on("timeover", (data) => console.log(data));

    return () => socket.off("timeover");
  }, [socket]);

  React.useEffect(() => {
    const totalDuration = endTime - startTime;
    const elapsedAtEntry = enteredTime - startTime;

    const initialRemaining = Math.max(0, endTime - enteredTime);

    if (initialRemaining > 0) {
      setRemainingTime(initialRemaining);
      setTimerActive(true);

      const initialProgress = (elapsedAtEntry / totalDuration) * 100;
      setProgress(Math.min(100, Math.max(0, initialProgress)));

      const timer = setInterval(() => {
        const now = Date.now();
        const elapsed = now - startTime;
        const currentProgress = (elapsed / totalDuration) * 100;

        setProgress(Math.min(100, Math.max(0, currentProgress)));

        const remaining = endTime - now;
        if (remaining <= 0) {
          setTimerActive(false);
          setProgress(100);
          clearInterval(timer);
        } else {
          setRemainingTime(remaining);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [startTime, endTime, enteredTime]);

  // 시간 포맷팅 함수
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="bg-layout-main px-8 pt-4">
      <div className="flex items-center gap-4">
        <TimerIcon width={24} height={24} />
        <ProgressBar
          label="투표 진행 시간 타이머"
          uses="default"
          max={100}
          value={progress}
          className="w-full"
        />
      </div>
      <div>{timerActive ? formatTime(remainingTime) : "투표 종료"}</div>
    </div>
  );
}
