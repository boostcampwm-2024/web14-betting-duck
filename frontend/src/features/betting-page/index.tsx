// import { ProgressBar } from "@/shared/components/ProgressBar";
import { BettingProvider } from "./provider/BettingProvider";
import { BettingContainer } from "./ui/BettingContainer";
// import { useBettingContext } from "./hook/use-betting-context";
// import React from "react";

function BettingPage() {
  return (
    <BettingProvider>
      {/* <BettingTimer /> */}
      <BettingContainer />
    </BettingProvider>
  );
}

export { BettingPage };

// function BettingTimer() {
//   const [remainingTime, setRemainingTime] = React.useState(0);
//   const [timerActive, setTimerActive] = React.useState(false);
//   const { bettingRoomInfo, socket } = useBettingContext();
//   const { endAt, startAt } = bettingRoomInfo.channel.metadata;
//   const enterTimeRecord = new Intl.DateTimeFormat("ko-KR", {
//     year: "numeric",
//     month: "numeric",
//     day: "numeric",
//     hour: "numeric",
//     minute: "numeric",
//     second: "numeric",
//   }).format(Date.now());

//   React.useEffect(() => {
//     const startTime = new Date(startAt);
//     const endTime = new Date(endAt);

//     const now: Date = new Date();
//     const timeSinceStart = now.getTime() - startTime.getTime(); // 시작 시간부터 현재까지 경과 시간
//     const totalDuration = endTime.getTime() - startTime.getTime(); // 전체 제한 시간
//     const remaining = Math.max(0, totalDuration - timeSinceStart);

//     if (remaining > 0) {
//       setRemainingTime(remainingTime);
//       setTimerActive(true);
//     }

//     const timer = setInterval(() => {
//       setRemainingTime((prevTime) => {
//         if (prevTime <= 1000) {
//           setTimerActive(false);
//           clearInterval(timer);
//           return 0;
//         }
//         return prevTime - 1000;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   React.useEffect(() => {
//     if (!socket.isConnected) return;

//     socket.on("timeover", (data) => console.log(data));
//   }, [socket]);

//   const formatTime = (ms: number) => {
//     const totalSeconds = Math.floor(ms / 1000);
//     const minutes = Math.floor(totalSeconds / 60);
//     const seconds = totalSeconds % 60;
//     return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
//   };

//   return (
//     <>
//       <ProgressBar
//         label="투표 진행 시간 타이머"
//         uses="default"
//         max={100}
//         value={20}
//       />
//       <span className="text-2xl font-semibold">
//         {timerActive ? formatTime(remainingTime) : "시간 종료"}
//       </span>
//     </>
//   );
// }
