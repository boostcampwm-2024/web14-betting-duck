import React from "react";
import { useWaitingContext } from "../../hooks/use-waiting-context";
import { useNavigate } from "@tanstack/react-router";
import { useUserContext } from "@/shared/hooks/useUserContext";
import { z } from "zod";
import { responseBetRoomInfo } from "@betting-duck/shared";

function MemberFooter({
  setSnackbarOpen,
  bettingRoomInfo,
}: {
  bettingRoomInfo: z.infer<typeof responseBetRoomInfo>;
  setSnackbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { socket } = useWaitingContext();
  const [isBettingStarted, setIsBettingStarted] = React.useState(false);
  const userContext = useUserContext();
  const navigate = useNavigate();
  const { channel } = bettingRoomInfo;
  const roomId = channel.id;

  React.useEffect(() => {
    (async () => {
      const response = await fetch(`/api/betrooms/${roomId}`);
      if (!response.ok) throw new Error("방 정보를 가져오는데 실패했습니다.");
      const json = await response.json();
      const { channel } = json.data;
      if (channel.status === "active") {
        setIsBettingStarted(true);
      }
    })();
  }, [roomId]);

  React.useEffect(() => {
    socket.on("startBetting", () => setIsBettingStarted(true));

    return () => {
      socket.off("startBetting");
    };
  }, [socket]);

  React.useEffect(() => {
    socket.on("cancelWaitingRoom", () => {
      window.location.href = "/my-page";
    });

    return () => {
      socket.off("cancelWaitingRoom");
    };
  }, [socket, navigate]);

  function leaveRoom() {
    socket.emit("leave-room", { roomId });
    userContext.setUserInfo({ role: "user", roomId: undefined });
    navigate({
      to: "/my-page",
      params: { roomId },
      replace: true,
    });
  }

  async function participateVote() {
    try {
      const response = await fetch(`/api/betrooms/${roomId}`);
      if (!response.ok) throw new Error("방 정보를 가져오는데 실패했습니다.");
      const json = await response.json();
      const { channel } = json.data;

      if (channel.status === "active") {
        window.location.href = `/betting/${roomId}/vote/voting`;
      } else {
        setSnackbarOpen(true);
        console.error("베팅이 아직 시작되지 않았습니다.");
      }
    } catch (error) {
      console.error("Error during navigation:", error);
    }
  }

  return (
    <React.Fragment>
      <button
        onClick={leaveRoom}
        className="bg-default text-secondary w-full rounded-lg p-[10px]"
      >
        나가기
      </button>
      <button
        disabled={!isBettingStarted}
        onClick={participateVote}
        className="bg-default text-secondary disabled:bg-default-disabled w-full rounded-lg p-[10px]"
      >
        투표 참여
      </button>
    </React.Fragment>
  );
}

export { MemberFooter };
