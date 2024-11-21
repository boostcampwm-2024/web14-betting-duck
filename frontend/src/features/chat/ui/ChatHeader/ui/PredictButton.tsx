import { Dialog, DialogTrigger, DialogContent } from "@/shared/ui/dialog";

function PredictButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-default bg-secondary shadow-far rounded-lg px-3 py-1 font-extrabold">
          예측 하기
        </button>
      </DialogTrigger>
      <DialogContent>
        <div>
          <h1>Betting Page</h1>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { PredictButton };
