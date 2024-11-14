import { Dialog, DialogTrigger, DialogContent } from "@/shared/ui/Dialog";

function EditIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-edit"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-info"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  );
}

function VotingStatusCard() {
  return (
    <div className="bg- bg-primary-default text-secondary-default flex flex-col gap-2 rounded-lg p-3 shadow-md">
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
      <h1 className="font-nanum-eb text-2xl">KBO 우승은 KIA다 !!</h1>
    </div>
  );
}

export { VotingStatusCard };
