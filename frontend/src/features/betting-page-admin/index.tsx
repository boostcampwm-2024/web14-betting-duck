import { BettingStatsDisplay } from "@/shared/components/BettingStatsDisplay/BettingStatsDisplay";
import { useLoaderData, useNavigate } from "@tanstack/react-router";
import { useCallback, useRef, useState } from "react";
import { useSocketIO } from "@/shared/hooks/useSocketIo";
import { BettingSummary } from "@/shared/utils/bettingOdds";
import { BettingTimer } from "@/shared/components/BettingTimer/BettingTimer";
import { BettingSharedLink } from "@/shared/components/BettingSharedLink/BettingSharedLink";
import { BettingStats } from "./model/types";
import { PercentageDisplay } from "@/shared/components/PercentageDisplay/PercentageDisplay";
import { refund } from "./model/api";
import { useLayoutShift } from "@/shared/hooks/useLayoutShift";

function BettingPageAdmin() {
  useLayoutShift();
  const [bettingSummary] = useState<BettingSummary>({
    totalParticipants: 0,
    totalAmount: 0,
    option1Percentage: "0.0",
    option2Percentage: "0.0",
    option1: {
      participants: 0,
      totalAmount: 0,
      multiplier: 1,
      returnRate: 1,
    },
    option2: {
      participants: 0,
      totalAmount: 0,
      multiplier: 1,
      returnRate: 1,
    },
  });
  const [stats1] = useState<BettingStats>({
    totalAmount: 0,
    returnRate: 1,
    participants: 0,
    multiplier: 0,
  });

  const [stats2] = useState<BettingStats>({
    totalAmount: 0,
    returnRate: 1,
    participants: 0,
    multiplier: 0,
  });

  const { bettingRoomInfo } = useLoaderData({
    from: "/betting_/$roomId/vote/admin",
  });
  const { channel } = bettingRoomInfo;

  // Room Information
  const roomId = channel.id;
  const option1 = channel.options.option1;
  const option2 = channel.options.option2;
  const defaultBetAmount = channel.settings.defaultBetAmount;
  const timer = channel.settings.duration;

  const [status] = useState(bettingRoomInfo.channel.status || "active");
  const navigate = useNavigate();
  const joinRoomRef = useRef(false);
  const fetchBetRoomInfoRef = useRef(false);

  const socket = useSocketIO({
    url: "/api/betting",
    onConnect: () => {
      console.log("관리자 페이지에 소켓이 연결 되었습니다.");
      handleSocketConnection();
    },
    onDisconnect: (reason) => {
      console.log("관리자 페이지에 소켓 연결이 끊겼습니다.", reason);
      joinRoomRef.current = false;
      fetchBetRoomInfoRef.current = false;
    },
    onError: (error) => {
      console.error("관리자 페이지에 소켓 에러가 발생했습니다.", error);
    },
  });

  const handleSocketConnection = useCallback(() => {
    // 방 참여가 아직 안 된 경우
    if (!joinRoomRef.current) {
      console.log(22);
      joinRoomRef.current = true;
      socket.emit("joinRoom", {
        channel: {
          roomId: channel.id,
        },
      });
    }

    // 방이 활성화 상태이고 정보를 아직 가져오지 않은 경우
    if (
      bettingRoomInfo.channel.status === "active" &&
      !fetchBetRoomInfoRef.current
    ) {
      console.log(33);
      fetchBetRoomInfoRef.current = true;
      socket.emit("fetchBetRoomInfo", {
        roomId: channel.id,
      });
    }
  }, [channel.id, bettingRoomInfo.channel.status, socket]);

  // useEffect(() => {
  //   socket.on("timeover", () => {
  //     updateBettingRoomInfo();
  //     updateBettingPool({ isBettingEnd: true });
  //   });

  //   return () => {
  //     socket.off("timeover");
  //   };
  // }, [socket, updateBettingPool, updateBettingRoomInfo]);

  // useEffect(() => {
  //   if (!socket.isConnected) return;
  //   socket.emit("joinRoom", {
  //     channel: {
  //       roomId: bettingRoomInfo.channel.id,
  //     },
  //   });
  // }, [socket, bettingRoomInfo]);

  // useEffect(() => {
  //   if (!socket.isConnected || bettingRoomInfo.channel.status !== "active")
  //     return;
  //   socket.emit("fetchBetRoomInfo", {
  //     roomId: bettingRoomInfo.channel.id,
  //   });
  // }, [socket, bettingRoomInfo]);

  // useEffect(() => {
  //   console.log(bettingRoomInfo.channel.status);
  //   setStatus((prev) => {
  //     if (prev !== bettingRoomInfo.channel.status) {
  //       return bettingRoomInfo.channel.status;
  //     }
  //     return prev;
  //   });
  // }, [bettingRoomInfo]);

  // useEffect(() => {
  //   const handleFetchBetRoomInfo = (data: unknown) => {
  //     if (!socket.isConnected || bettingRoomInfo.channel.status !== "active")
  //       return;
  //     const roomInfo = data as FetchBetRoomInfoData;

  //     const { option1, option2 } = roomInfo.channel;

  //     updateBettingPool({
  //       option1: {
  //         participants: Number(option1.participants),
  //         totalAmount: Number(option1.currentBets),
  //       },
  //       option2: {
  //         participants: Number(option2.participants),
  //         totalAmount: Number(option2.currentBets),
  //       },
  //     });

  //     const bettingPool = {
  //       option1: {
  //         totalAmount: Number(option1.currentBets),
  //         participants: Number(option1.participants),
  //       },
  //       option2: {
  //         totalAmount: Number(option2.currentBets),
  //         participants: Number(option2.participants),
  //       },
  //     };

  //     const newBettingSummary = getBettingSummary(bettingPool);

  //     setBettingSummary((prev) => {
  //       if (JSON.stringify(prev) !== JSON.stringify(newBettingSummary)) {
  //         return newBettingSummary;
  //       }
  //       return prev;
  //     });

  //     setStats1((prev) => {
  //       const newStats = {
  //         totalAmount: newBettingSummary.option1.totalAmount,
  //         returnRate: newBettingSummary.option1.returnRate,
  //         participants: newBettingSummary.option1.participants,
  //         multiplier: newBettingSummary.option1.multiplier,
  //       };

  //       if (JSON.stringify(prev) !== JSON.stringify(newStats)) {
  //         return newStats;
  //       }
  //       return prev;
  //     });

  //     setStats2((prev) => {
  //       const newStats = {
  //         totalAmount: newBettingSummary.option2.totalAmount,
  //         returnRate: newBettingSummary.option2.returnRate,
  //         participants: newBettingSummary.option2.participants,
  //         multiplier: newBettingSummary.option1.multiplier,
  //       };

  //       if (JSON.stringify(prev) !== JSON.stringify(newStats)) {
  //         return newStats;
  //       }

  //       return prev;
  //     });
  //   };

  //   socket.on("fetchBetRoomInfo", handleFetchBetRoomInfo);

  //   return () => {
  //     socket.off("fetchBetRoomInfo");
  //   };
  // }, [socket, bettingRoomInfo, updateBettingPool]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`/api/betrooms/${roomId}`);
  //       if (response.ok) {
  //         const { data } = await response.json();
  //         setTitle(data.channel.title);
  //         setOption1(data.channel.options.option1.name);
  //         setOption2(data.channel.options.option2.name);
  //         setTimer(data.channel.settings.duration);
  //         setDefaultBetAmount(data.channel.settings.defaultBetAmount);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   if (roomId) fetchData();
  // }, [roomId]);

  const handleCancelClick = async () => {
    refund(roomId)
      .then((data) => {
        console.log("API 성공 결과:", data);
        navigate({
          to: "/my-page",
        });
      })
      .catch((error) => {
        console.error("API 실패 결과:", error);
      });
  };

  const handleFinishClick = () => {
    navigate({
      to: `/betting/${roomId}/vote/decide`,
    });
  };

  const handleBetClick = async (
    roomId: string,
    option: "option1" | "option2",
  ) => {
    try {
      const response = await fetch("/api/bets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: {
            betAmount: 100,
            selectOption: option, // option1 또는 option2
          },
          channel: {
            roomId: roomId,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Bet successfully posted:", responseData);
    } catch (error) {
      console.error("Failed to post bet:", error);
    }
  };

  return (
    <div className="bg-layout-main flex h-full w-full flex-col justify-between">
      <div className="flex flex-col gap-5">
        <BettingTimer />
        <div className="flex flex-col gap-6 p-5">
          <div className="bg-secondary mb-4 rounded-lg p-3 text-center shadow-inner">
            <h1 className="text-default-disabled text-md mb-1 font-bold">
              배팅 주제
            </h1>
            <h1 className="text-primary mb-1 pt-2 text-4xl font-extrabold">
              {channel.title}
            </h1>
            <p>
              {status === "active" ? (
                "투표가 진행 중입니다. 투표를 취소할 수 있습니다."
              ) : (
                <>
                  투표를 취소하게 되면{" "}
                  <span className="text-bettingPink font-extrabold">
                    모든 베팅 금액이 환불되고 베팅이 종료되며, 돌이킬 수
                    없습니다.
                  </span>
                </>
              )}
            </p>
            <h1 className="text-default-disabled text-md mb-1 font-bold">
              베팅 정보
            </h1>
            <p>
              ∙ 최소 베팅 금액:{" "}
              <span className="font-extrabold">{defaultBetAmount}</span>
            </p>
            <p>
              ∙ 설정한 시간:{" "}
              <span className="font-extrabold">{timer / 60}분</span>
            </p>
            <p>
              ∙ 전체 베팅 참여자:{" "}
              <span className="font-extrabold">
                {bettingSummary?.totalParticipants}
              </span>
            </p>
          </div>

          <div className="flex justify-between gap-6">
            <BettingStatsDisplay
              stats={stats1}
              uses={"winning"}
              content={option1.name}
            >
              <PercentageDisplay
                percentage={parseInt(bettingSummary.option1Percentage)}
                index={0}
              />
            </BettingStatsDisplay>
            <BettingStatsDisplay
              stats={stats2}
              uses={"losing"}
              content={option2.name}
            >
              <PercentageDisplay
                percentage={parseInt(bettingSummary.option2Percentage)}
                index={1}
              />
            </BettingStatsDisplay>
          </div>

          <div className="flex w-full justify-end font-extrabold">
            <div className="flex w-full justify-end gap-6">
              <button
                className="bg-secondary text-default hover:bg-secondary-hover hover:text-layout-main w-1/2 rounded-lg px-4 py-2 shadow-md"
                onClick={handleCancelClick}
              >
                승부 예측 취소
              </button>
              <button
                className="bg-primary text-layout-main hover:bg-primary-hover disabled:bg-primary-disabled w-1/2 rounded-lg px-4 py-2 shadow-md"
                disabled={status !== "timeover"}
                onClick={handleFinishClick}
              >
                승부 예측 종료
              </button>
            </div>
          </div>
        </div>
      </div>
      <button onClick={() => handleBetClick(roomId, "option1")}>투표1</button>
      <button onClick={() => handleBetClick(roomId, "option2")}>투표2</button>
      <BettingSharedLink />
    </div>
  );
}

export { BettingPageAdmin };
