import { Dialog, DialogTrigger, DialogContent } from "@/shared/ui/Dialog";

function PredictButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-default-default text-w rounded-lg bg-slate-100 px-3 py-1">
          예측 하기
        </button>
      </DialogTrigger>
      <DialogContent>
        <Dialog>
          <h1>Dialog content</h1>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
}

export { PredictButton };
