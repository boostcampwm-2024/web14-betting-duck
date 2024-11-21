import { DuckCoinIcon } from "@/shared/icons";
import { BettingStatsDisplay } from "./BettingStatsDisplay";
import { PercentageDisplay } from "./PercentageDisplay";
import { BettingForm } from "./BettingForm";
import { BettingHeader } from "./BettingHeader";
import { cn } from "@/shared/misc";
import React from "react";
import { useSocketIO } from "@/shared/hooks/use-socket-io";
import { getRouteApi } from "@tanstack/react-router";

interface BettingStats {
  coinAmount: number;
  bettingRate: string;
  participant: number;
  percentage: number;
}

interface BettingRoom {
  title: string;
  timeRemaining: number;
  option1: {
    content: string;
    stats: BettingStats;
  };
  option2: {
    content: string;
    stats: BettingStats;
  };
}

const route = getRouteApi("/betting-page");

function BettingPage() {
  const { nickname } = route.useSearch();

  const roomIdRef = React.useRef<string | null>(null);
  const socket = useSocketIO({
    url: "/api/betting",
    accessToken: "",
    onConnect: () => {
      console.log("Betting Page에서 소켓이 연결 되었습니다.");
    },
    onDisconnect: (reason) => {
      console.log(reason);
      console.log("Betting Page에서 소켓이 연결이 끊겼습니다.");
    },
    onError: (error) => {
      console.log("Betting Page에서 소켓 에러가 발생했습니다.", error);
    },
  });
  const bettingData: BettingRoom = {
    title: "KBO 우승은 KIA다!",
    timeRemaining: 445,
    option1: {
      content: "삼성",
      stats: {
        coinAmount: 1000,
        bettingRate: "1:12",
        participant: 100,
        percentage: 62,
      },
    },
    option2: {
      content: "KIA",
      stats: {
        coinAmount: 1000,
        bettingRate: "1:12",
        participant: 100,
        percentage: 62,
      },
    },
  };
  React.useEffect(() => {}, []);

  React.useEffect(() => {
    socket.on("fetchRoomUsers", (data) => {
      console.log("fetchRoomUsers");
      console.log(data);
    });

    return () => socket.off("fetchRoomUsers");
  }, [socket]);

  React.useEffect(() => {
    if (!socket.isConnected) return;
    if (roomIdRef.current) return;
    fetch("/api/betrooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        channel: {
          title: "기아 vs 삼성 승부 예측",
          options: {
            option1: "기아",
            option2: "삼성",
          },
          settings: {
            duration: 120,
            defaultBetAmount: 100,
          },
        },
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw Error("방 생성에 실패했습니다.");
        }
      })
      .then((data) => {
        roomIdRef.current = data.data.roomId;
      })
      .catch((error) => console.error(error));

    return () => {
      socket.off("joinRoom");
    };
  }, [socket, nickname]);

  return (
    <div
      className={cn(
        "betting-container",
        "shadow-middle bg-layout-main h-full max-h-[430px] w-full min-w-[630px] rounded-lg border-2 p-6",
      )}
    >
      <button
        onClick={() => {
          console.log(roomIdRef.current);
          socket.emit("joinRoom", {
            sender: {
              nickname: "김덕배",
            },
            channel: {
              roomId: roomIdRef.current,
            },
          });
        }}
      >
        참여하기
      </button>
      <button
        onClick={() => {
          socket.emit("leaveRoom", {
            roomId: roomIdRef.current,
          });
        }}
      >
        나가기
      </button>
      <div className="flex h-full flex-col">
        <BettingHeader
          content={bettingData.title}
          time={bettingData.timeRemaining}
        />
        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-6">
            <BettingStatsDisplay
              stats={bettingData.option1.stats}
              content={bettingData.option1.content}
              uses="winning"
            />
            <BettingStatsDisplay
              stats={bettingData.option2.stats}
              content={bettingData.option2.content}
              uses="losing"
            />
          </div>
          <div className="flex flex-row gap-6">
            {[bettingData.option1, bettingData.option2].map((option, index) => (
              <PercentageDisplay
                key={`betting-percentage-${index}`}
                index={index}
                percentage={option.stats.percentage}
              />
            ))}
          </div>
          <BettingForm />
        </div>

        <div className="flex items-center justify-end gap-2 pt-4 text-center font-bold text-gray-600">
          소유 금액:{" "}
          <span className="flex items-center gap-2 font-extrabold">
            <DuckCoinIcon width={26} height={26} />
            3000
          </span>
        </div>
      </div>
    </div>
  );
}

export { BettingPage };
