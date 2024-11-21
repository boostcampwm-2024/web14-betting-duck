import { Dialog, DialogTrigger, DialogContent } from "@/shared/ui/Dialog";
import { EditIcon, InfoIcon } from "@/shared/icons";

function VotingStatusCard() {
  return (
    <div className="bg-primary text-secondary-default text-secondary flex w-full flex-col gap-2 rounded-lg p-3 shadow-md">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <InfoIcon />
          <span>투표 생성 정보</span>
        </div>
        <Dialog>
          <DialogTrigger>
            <EditIcon />
          </DialogTrigger>
          <DialogContent>
            <div>
              <div>투표 주제</div>
              <div>우승팀 예측하기</div>
            </div>
            <div>
              <div>투표 기간</div>
              <div>2021.10.01 ~ 2021.10.08</div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <h1 className="text-xl font-extrabold">KBO 우승은 KIA다 !!</h1>
    </div>
  );
}

export { VotingStatusCard };
