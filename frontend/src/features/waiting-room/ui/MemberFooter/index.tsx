import React from "react";
import { useWaitingContext } from "../../hooks/use-waiting-context";
import { useNavigate } from "@tanstack/react-router";
import { useUserContext } from "@/shared/hooks/useUserContext";

function MemberFooter() {
  const { socket, roomId } = useWaitingContext();
  const [isBettingStarted, setIsBettingStarted] = React.useState(false);
  const userContext = useUserContext();
  const navigate = useNavigate();

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
      navigate({ to: "/my-page" });
    });

    return () => {
      socket.off("cancelWaitingRoom");
    };
  }, [socket, navigate]);

  function leaveRoom() {
    socket.emit("leave-room", { roomId });
    userContext.setUserInfo({ role: "user", roomId: undefined });
    navigate({ to: "/my-page" });
  }

  function participateVote() {
    userContext.setUserInfo({ roomId });
    navigate({ to: "/betting/$roomId/vote/voting", params: { roomId } });
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
