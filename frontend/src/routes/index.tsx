import { Dialog, DialogTrigger, DialogContent } from "@/shared/ui/dialog";
import { createFileRoute, redirect } from "@tanstack/react-router";

const user = undefined;

export const Route = createFileRoute("/")({
  loader: () => {
    if (!user) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: () => (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded-md bg-blue-600 pb-2 pl-4 pr-4 pt-2 font-extrabold text-white">
          기본 Dialog 열기
        </button>
      </DialogTrigger>
      <DialogContent className="rounded-md bg-red-200 p-4">
        <div>
          <h1 className="font-nanum-eb text-2xl">기본 Dialog</h1>
        </div>
        <div className="flex items-center space-x-2">
          <p>Dialog 내용이 여기에 들어갑니다.</p>
        </div>
        <div className="sm:justify-start">
          <button type="button" className="rounded-md bg-slate-200 px-4 py-2">
            확인
          </button>
        </div>
      </DialogContent>
    </Dialog>
  ),
});
