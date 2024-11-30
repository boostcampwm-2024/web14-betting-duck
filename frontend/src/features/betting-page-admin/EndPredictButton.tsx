import { useNavigate, useParams } from "@tanstack/react-router";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/shared/components/Dialog";

function EndPredictButton() {
  const navigate = useNavigate();
  const { roomId } = useParams({ from: "/betting_/$roomId/vote" });

  const handleFinishClick = () => {
    navigate({
      to: `/betting/${roomId}/vote/decide`,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="bg-primary text-layout-main hover:bg-primary-hover disabled:bg-primary-disabled w-1/2 rounded-lg px-4 py-2 shadow-md"
          onClick={handleFinishClick}
        >
          승부 예측 종료
        </button>
      </DialogTrigger>
      <DialogContent>
        <div>
          <h1>HI</h1>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { EndPredictButton };
