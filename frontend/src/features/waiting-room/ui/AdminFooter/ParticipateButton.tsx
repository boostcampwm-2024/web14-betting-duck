import { useWaitingContext } from "../../hooks/use-waiting-context";
import React from "react";
import { useParams } from "@tanstack/react-router";

function ParticipateButton({
  setSnackbarOpen,
}: {
  setSnackbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { roomId } = useParams({
    from: "/betting_/$roomId/waiting",
  });
  const { socket } = useWaitingContext();
  const [isBettingStarted, setIsBettingStarted] = React.useState(false);

  React.useEffect(() => {
    socket.on("startBetting", () => {
      setIsBettingStarted(true);
    });

    return () => {
      socket.off("startBetting");
    };
  }, [socket, roomId]);

  async function participateVote() {
    try {
      const response = await fetch(`/api/betrooms/${roomId}`);
      if (!response.ok) throw new Error("방 정보를 가져오는데 실패했습니다.");
      const json = await response.json();
      const { channel } = json.data;

      if (channel.status === "active") {
        window.location.href = `/betting/${roomId}/vote/admin`;
      } else {
        console.error("베팅이 아직 시작되지 않았습니다.");
      }
    } catch (error) {
      setSnackbarOpen(true);
      console.error("Error during navigation:", error);
    }
  }

  return (
    <button
      disabled={!isBettingStarted}
      onClick={participateVote}
      className="bg-default text-secondary w-full rounded-lg p-[10px] disabled:bg-gray-400"
    >
      참여하기
    </button>
  );
}

export { ParticipateButton };
