import { cn } from "@/shared/misc";
import React from "react";

function ChatError() {
  return (
    <React.Fragment>
      <div className="bg-layout-main relative flex h-fit w-full items-center px-4">
        <div className="bg-primary text-secondary font-nanum-eb shadow-long flex w-full flex-row items-center justify-between rounded-lg px-9 py-4">
          <div className="flex flex-col">
            <span className="text-secondary-default font-nanum-r text-xs">
              승부 예측 주제
            </span>
            <h1 className="text-2xl">{""}</h1>
          </div>
          <button className="text-default bg-secondary shadow-far rounded-lg px-3 py-1 font-extrabold">
            예측 하기
          </button>
        </div>
        <div
          id="message-container-scroll-top"
          className="absolute -bottom-[16px] left-0 h-[1px] w-full"
        />
      </div>
      <div
        id="message-container"
        className={cn("message-container mt-4 overflow-y-scroll")}
      >
        <div className="relative w-full">
          <div className="absolute inset-x-0 px-3 py-4">
            <div className="flex flex-col space-y-4"></div>
          </div>
        </div>
      </div>
      <div className="bg-secondary relative flex h-full max-h-[60px] w-full flex-row items-center justify-between gap-4 py-3 pl-2 pr-4">
        <div
          id="message-container-scroll-bottom"
          className="absolute -top-[16px] left-0 h-[1px] w-full"
        />
        <div className="relative flex h-full w-full items-center">
          <pre
            className={`overflow-wrap-break-word ml-1 flex h-full min-h-[20px] w-full max-w-full resize-none items-center overflow-y-hidden whitespace-normal break-words break-all rounded-lg border-none bg-slate-100 px-3 py-2 font-normal leading-5 text-inherit outline-none`}
            contentEditable="true"
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export { ChatError };
