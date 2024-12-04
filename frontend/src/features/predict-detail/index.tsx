// import { DuckCoinIcon, TrophyIcon } from "@/shared/icons";
// import { UserFooter } from "./ui/UserFooter";
// import { GuestFooter } from "./ui/GuestFooter";
// import { useLayoutShift } from "@/shared/hooks/useLayoutShift";
// import { useUserContext } from "@/shared/hooks/useUserContext";
// import { useLoaderData } from "@tanstack/react-router";
// import { BettingStatistics } from "./ui/Bettingstatistics";
// import { AdminBettingResult } from "./ui/AdminBettingResult";
// import { BettingResult } from "./ui/UserBettingResult";

// function PredictDetail() {
//   useLayoutShift();
//   const { bettingRoomInfo } = useLoaderData({
//     from: "/betting_/$roomId/vote",
//   });
//   const { channel } = bettingRoomInfo;
//   const { betResults, personalBetResult } = useLoaderData({
//     from: "/betting_/$roomId/vote/resultDetail",
//   });
//   const { userInfo } = useUserContext();
//   const myoption = personalBetResult.selectedOption;
//   const myresult =
//     myoption === "option1" && betResults.winning_option === "option1"
//       ? "win"
//       : "lose";

//   const getWinningOptionName = () =>
//     channel.options[betResults.winning_option].name;

//   const renderWinningIcon = () => (
//     <DuckCoinIcon
//       className={
//         betResults.winning_option === "option1"
//           ? "text-bettingBlue"
//           : "text-bettingPink"
//       }
//       width={24}
//       height={24}
//     />
//   );

//   return (
//     <div className="bg-layout-main flex h-full w-full flex-col items-center justify-between gap-4">
//       {/* PredictDetail Header */}
//       <div className="bg-primary shadow-middle flex w-[90cqw] flex-col items-center justify-center rounded-2xl px-4 py-4">
//         <div className="text-layout-main text-lg font-extrabold">
//           <span>{channel.title}</span>
//         </div>
//         <h1 className="text-layout-main flex items-center gap-4 text-2xl font-extrabold">
//           <TrophyIcon className="font-extrabold" width={32} height={32} />
//           승리 : {getWinningOptionName()}
//         </h1>
//       </div>

//       {/* PredictDetail statistics */}
//       <BettingStatistics betResults={betResults} channel={channel} />

//       {/* PredictDetail Result */}
//       {userInfo.role === "admin" ? (
//         <AdminBettingResult
//           winningOption={betResults.winning_option}
//           winner={
//             betResults.winning_option === "option1"
//               ? bettingRoomInfo.channel.options.option1.name
//               : bettingRoomInfo.channel.options.option2.name
//           }
//           winnerCount={
//             betResults.winning_option === "option1"
//               ? betResults.option_1_total_participants
//               : betResults.option_2_total_participants
//           }
//         />
//       ) : (
//         <BettingResult
//           renderWinningIcon={renderWinningIcon}
//           winningOption={betResults.winning_option}
//           options={bettingRoomInfo.channel.options}
//           earnedAmount={
//             betResults.winning_option === "option1"
//               ? betResults.option_1_total_participants
//               : betResults.option_2_total_participants
//           }
//         />
//       )}

//       {/* PredictDetail Own */}
//       <div className="w-full px-8">
//         <div className="bg-secondary flex flex-col gap-4 rounded-lg px-8 py-4 shadow-inner">
//           <div className="flex flex-row items-center gap-2 text-lg font-extrabold">
//             <h2>배팅 결과</h2>
//           </div>
//           <div className="flex w-full items-center justify-between font-extrabold">
//             <div className="flex items-center justify-center gap-2">
//               {renderWinningIcon()} 베팅 금액
//             </div>
//             <p>{personalBetResult.betAmount} 코인</p>
//           </div>
//           <div className="flex w-full items-center justify-between font-extrabold">
//             <p>선택 옵션</p>
//             <p
//               className={`${myresult === "win" ? "text-bettingBlue" : "text-bettingPink"}`}
//             >
//               {myoption === "option1"
//                 ? channel.options.option1.name
//                 : channel.options.option2.name}
//             </p>
//           </div>
//           <div className="flex w-full items-center justify-between font-extrabold">
//             <p>얻은 금액</p>
//             <p>
//               <span
//                 className={`${myresult === "win" ? "text-bettingBlue" : "text-bettingPink"}`}
//               >
//                 {myresult === "win" ? "+" : "-"} {personalBetResult.betAmount}{" "}
//                 코인
//               </span>
//             </p>
//           </div>
//         </div>
//       </div>

//       <div>
//         <div className="flex flex-col items-center justify-center gap-2 px-8">
//           {userInfo.role === "guest" ? <GuestFooter /> : <UserFooter />}
//         </div>
//         <div className="bg-layout-main h-[60px] w-[100cqw]" />
//       </div>
//     </div>
//   );
// }

// export { PredictDetail };
