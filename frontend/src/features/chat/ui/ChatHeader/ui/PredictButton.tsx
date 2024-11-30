import { BettingPage } from "@/features/betting-page";
import { useChat } from "@/features/chat/hook/useChat";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/shared/components/Dialog";
import { useNavigate, useParams } from "@tanstack/react-router";

function PredictButton() {
  const { socket } = useChat();
  const { roomId } = useParams({ from: "/betting_/$roomId/vote" });
  const navigate = useNavigate();

  return (
    <Dialog>
      <DialogTrigger
        asChild
        onClick={() => {
          socket.emit("leaveRoom", { roomId });
          navigate({ to: "/my-page" });
        }}
      >
        <button className="text-default bg-secondary shadow-far rounded-lg px-3 py-1 font-extrabold">
          배팅 창 나가기
        </button>
      </DialogTrigger>
      <DialogContent>
        <BettingPage />
      </DialogContent>
    </Dialog>
  );
}

export { PredictButton };
