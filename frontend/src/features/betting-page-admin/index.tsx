import { BettingStatsDisplay } from "@/shared/components/BettingStatsDisplay/BettingStatsDisplay";
import { useLoaderData, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSocketIO } from "@/shared/hooks/useSocketIo";
import { BettingTimer } from "@/shared/components/BettingTimer/BettingTimer";
import { BettingSharedLink } from "@/shared/components/BettingSharedLink/BettingSharedLink";
import { PercentageDisplay } from "@/shared/components/PercentageDisplay/PercentageDisplay";
import { endBetRoom, refund } from "./model/api";
import { useLayoutShift } from "@/shared/hooks/useLayoutShift";
import { bettingRoomSchema } from "../betting-page/model/schema";
import { DuckCoinIcon } from "@/shared/icons";

function BettingPageAdmin() {
  useLayoutShift();
  const { bettingRoomInfo } = useLoaderData({
    from: "/betting_/$roomId/vote/admin",
  });
  const { channel } = bettingRoomInfo;
  const [status, setStatus] = useState(
    bettingRoomInfo.channel.status || "active",
  );
  const [bettingInfo, setBettingInfo] = useState({
    option1: { participants: 0, currentBets: 0 },
    option2: { participants: 0, currentBets: 0 },
  });
  const navigate = useNavigate();
  const joinRoomRef = useRef(false);
  const fetchBetRoomInfoRef = useRef(false);
  const [winnerOption, setWinnerOption] = useState<
    "option1" | "option2" | null
  >(null);

  // Room Information
  const roomId = channel.id;
  const option1 = channel.options.option1;
  const option2 = channel.options.option2;
  const defaultBetAmount = channel.settings.defaultBetAmount;
  const timer = channel.settings.duration;

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

  const handleTimeOver = useCallback(() => {
    setStatus((prev) => {
      if (prev !== "timeover") {
        return "timeover";
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    if (!socket) return;
    console.log("timeover");
    socket.on("timeover", handleTimeOver);

    return () => {
      socket.off("timeover");
    };
  }, [socket, handleTimeOver]);

  useEffect(() => {
    if (!socket) return;

    socket.on("fetchBetRoomInfo", (data) => {
      const result = bettingRoomSchema.safeParse(data);
      if (!result.success) {
        console.error(result.error.errors);
        return;
      }

      const updatedBettingRoomInfo = result.data;

      // 기존 상태와 새 데이터를 비교하여 필요한 경우에만 상태 업데이트
      setBettingInfo((prev) => {
        const newOption1 = {
          participants: updatedBettingRoomInfo.channel.option1.participants,
          currentBets: updatedBettingRoomInfo.channel.option1.currentBets,
        };

        const newOption2 = {
          participants: updatedBettingRoomInfo.channel.option2.participants,
          currentBets: updatedBettingRoomInfo.channel.option2.currentBets,
        };

        // 변경 여부 확인
        const isOption1Changed =
          prev.option1.participants !== newOption1.participants ||
          prev.option1.currentBets !== newOption1.currentBets;

        const isOption2Changed =
          prev.option2.participants !== newOption2.participants ||
          prev.option2.currentBets !== newOption2.currentBets;

        // 변경되지 않은 경우 이전 상태를 그대로 반환
        if (!isOption1Changed && !isOption2Changed) {
          return prev;
        }

        // 변경된 경우만 상태를 업데이트
        return {
          option1: newOption1,
          option2: newOption2,
        };
      });
    });

    return () => {
      socket.off("fetchBetRoomInfo");
    };
  }, [socket]);

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

  const getTotalParticipants = () => {
    return bettingInfo.option1.participants + bettingInfo.option2.participants;
  };

  const getTotalBetAmount = () => {
    return bettingInfo.option1.currentBets + bettingInfo.option2.currentBets;
  };

  const getMultiplier = (option: "option1" | "option2") => {
    const optionBetAmount = bettingInfo[option].currentBets;
    const totalBetAmount = getTotalBetAmount();

    if (optionBetAmount === 0) {
      return 1;
    }

    const multiplier = Math.max(1, totalBetAmount / optionBetAmount);
    return Number(multiplier.toFixed(2));
  };

  const getReturnRate = (option: "option1" | "option2") => {
    return (getMultiplier(option) - 1) * 100;
  };

  const getPercentage = (option: "option1" | "option2") => {
    const totalBetAmount = getTotalBetAmount();
    if (totalBetAmount === 0) {
      return 0;
    }
    return Math.round((bettingInfo[option].currentBets / totalBetAmount) * 100);
  };

  const getStats = (option: "option1" | "option2") => {
    return {
      totalAmount: bettingInfo[option].currentBets,
      returnRate: getReturnRate(option),
      participants: bettingInfo[option].participants,
      multiplier: getMultiplier(option),
    };
  };

  const handleSelectWinner = (option: "option1" | "option2") => {
    setWinnerOption(option);
  };

  const handleFinishClick = async () => {
    if (!winnerOption) {
      return;
    }

    try {
      const roomId = channel.id;
      const result = await endBetRoom(roomId, winnerOption);
      console.log(result);
      navigate({ to: `/betting/${roomId}/vote/resultDetail` });
    } catch (error) {
      if (error instanceof Error) {
        console.error("API 요청 실패:", error.message);
      } else {
        console.error("알 수 없는 오류 발생");
      }
    }
  };

  return (
    <div className="bg-layout-main flex h-full w-full flex-col justify-between">
      <div className="flex flex-col gap-5">
        <BettingTimer socket={socket} />
        <div className="flex flex-col gap-6 p-5">
          <div className="bg-secondary mb-4 rounded-lg p-3 text-center shadow-inner">
            <h1 className="text-default-disabled text-md mb-1 font-bold">
              배팅 주제
            </h1>
            <h1 className="text-primary mb-1 pt-2 text-4xl font-extrabold">
              {channel.title}
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
              ∙ 설정한 시간:{" "}
              <span className="font-extrabold">{timer / 60}분</span>
            </p>
            <p>
              ∙ 전체 베팅 참여자:{" "}
              <span className="font-extrabold">{getTotalParticipants()}</span>
            </p>
          </div>

          {status === "timeover" ? (
            <div className="flex w-full overflow-hidden rounded-xl border">
              <div className="relative flex w-1/2">
                <input
                  type="radio"
                  name="bettingOption"
                  value={option1.name}
                  id="option1"
                  className="peer hidden"
                  onChange={() => {
                    handleSelectWinner("option1");
                  }}
                />
                <label
                  htmlFor="option1"
                  className="text-bettingBlue peer-checked:bg-bettingBlue-behind flex w-full cursor-pointer flex-col items-center justify-center border-r py-2 pl-2 hover:bg-[#c7d5f96d]"
                >
                  <p className="text-md mb-1 font-bold">승리 옵션1</p>
                  <DuckCoinIcon width={70} />
                  <div className="mt-2 flex flex-col items-center">
                    <p className="text-xl font-extrabold">
                      {option1.name}의 승리
                    </p>
                  </div>
                </label>
              </div>
              <div className="relative flex w-1/2">
                <input
                  type="radio"
                  name="bettingOption"
                  value={option2.name}
                  id="option2"
                  className="peer hidden"
                  onChange={() => handleSelectWinner("option2")}
                />
                <label
                  htmlFor="option2"
                  className="text-bettingPink peer-checked:bg-bettingPink-behind flex w-full cursor-pointer flex-col items-center justify-center border-r py-2 pl-2 hover:bg-[#eab2d66c]"
                >
                  <p className="text-md mb-1 font-bold">승리 옵션2</p>
                  <DuckCoinIcon width={70} />
                  <div className="mt-2 flex flex-col items-center">
                    <p className="text-xl font-extrabold">
                      {option2.name}의 승리
                    </p>
                  </div>
                </label>
              </div>
            </div>
          ) : (
            <div className="flex justify-between gap-6">
              <BettingStatsDisplay
                stats={getStats("option1")}
                uses={"winning"}
                content={option1.name}
              >
                <PercentageDisplay
                  percentage={getPercentage("option1")}
                  index={0}
                />
              </BettingStatsDisplay>
              <BettingStatsDisplay
                stats={getStats("option2")}
                uses={"losing"}
                content={option2.name}
              >
                <PercentageDisplay
                  percentage={getPercentage("option2")}
                  index={1}
                />
              </BettingStatsDisplay>
            </div>
          )}

          <div className="flex w-full justify-end font-extrabold">
            <div className="flex w-full justify-end gap-6">
              <button
                className="bg-secondary text-default hover:bg-secondary-hover hover:text-layout-main w-1/2 rounded-lg px-4 py-2 shadow-md"
                onClick={handleCancelClick}
              >
                베팅 취소
              </button>
              <button
                className="bg-primary text-layout-main hover:bg-primary-hover disabled:bg-primary-disabled w-1/2 rounded-lg px-4 py-2 shadow-md"
                disabled={status !== "timeover" || !winnerOption}
                onClick={handleFinishClick}
              >
                베팅 종료
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
