import { EditIcon, InfoIcon } from "@/shared/icons";
import React from "react";

function Error() {
  return (
    <div className="bg-layout-main flex h-full w-full flex-col justify-between pb-16 pt-8">
      <div className="flex flex-col items-center justify-center gap-14 p-6">
        <h1 className="text-default text-xl font-extrabold">투표대기창</h1>
        <div className="bg-primary text-secondary-default text-secondary flex w-full flex-col gap-2 rounded-lg p-3 shadow-md">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-2">
              <InfoIcon />
              <span>투표 생성 정보</span>
            </div>
            <EditIcon />
          </div>
          <h1 className="text-xl font-extrabold">KBO 우승은 KIA다 !!</h1>
        </div>
      </div>
      <section className="flex flex-col gap-6 px-4">
        <div className="bg-secondary flex flex-col gap-4 rounded-lg px-6 pb-4 pt-2 shadow-inner">
          <div className="font-extrabold">참가 중인 사용자</div>
          <ul className="max flex w-full max-w-[366px] flex-row gap-4 overflow-x-scroll font-bold"></ul>
        </div>
        <div
          className={
            "bg-secondary flex w-full flex-row items-center justify-between gap-4 rounded-lg px-4 py-3 shadow-inner"
          }
        >
          <div className="text-default text-md max-w-[310px] overflow-x-scroll whitespace-nowrap font-extrabold"></div>
          <button
            className={
              "hover:border-layout-main hover:bg-secondary-hover hover:text-layout-main rounded-md border border-transparent p-2 outline-none transition"
            }
          >
            {" "}
          </button>
        </div>
      </section>
      <div className="flex flex-row gap-4 px-4 text-lg font-extrabold">
        <button className="bg-default text-secondary w-full rounded-lg p-[10px]">
          투표 취소
        </button>
        <button className="bg-default text-secondary w-full rounded-lg p-[10px]">
          투표 시작
        </button>
      </div>
    </div>
  );
}

const WaitingError = React.memo(Error);

export { WaitingError };
