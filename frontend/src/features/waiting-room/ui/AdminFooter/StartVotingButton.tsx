import { useNavigate } from "@tanstack/react-router";
import { useWaitingContext } from "../../hooks/use-waiting-context";

function StartVotingButton() {
  const navigate = useNavigate();
  const { roomId, setIsBettingStarted } = useWaitingContext();

  async function startBettingRoom() {
    try {
      const response = await fetch(`/api/betrooms/start/${roomId}`, {
        method: "PATCH",
      });
      if (!response.ok) throw new Error("배팅 시작에 실패했습니다.");
      setIsBettingStarted(true);
      navigate({ to: "../vote" });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <button
      onClick={startBettingRoom}
      className="bg-default text-secondary w-full rounded-lg p-[10px]"
    >
      투표 시작
    </button>
  );
}

export { StartVotingButton };
