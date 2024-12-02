import { BettingPage } from "@/features/betting-page";
import { useChat } from "@/features/chat/hook/useChat";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/shared/components/Dialog";
import { useNavigate, useParams } from "@tanstack/react-router";
import { STORAGE_KEY } from "@/features/betting-page/model/var";
import { useUserContext } from "@/shared/hooks/useUserContext";

function PredictButton() {
  const { socket } = useChat();
  const { setUserInfo } = useUserContext();
  const { roomId } = useParams({ from: "/betting_/$roomId/vote" });
  const navigate = useNavigate();

  return (
    <Dialog>
      <DialogTrigger
        asChild
        onClick={() => {
          socket.emit("leaveRoom", { roomId });
          setUserInfo({ role: "user", roomId: undefined });
          sessionStorage.removeItem(STORAGE_KEY);
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
