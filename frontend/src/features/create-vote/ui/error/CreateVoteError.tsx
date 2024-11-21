function CreateVoteError() {
  return (
    <div className="bg-layout-main flex flex-col items-center gap-4 p-9">
      <h1 className="text-default my-8 text-xl font-extrabold">
        승부 예측 생성하기
      </h1>

      <div className="flex w-full flex-col gap-4">
        <div className="bg-layout-sidebar w-full rounded-lg shadow-inner">
          <div className="bg-layout-sidebar w-full rounded-lg shadow-inner">
            <label className="flex w-full items-center gap-2 p-4">
              <div className="flex-shrink-0">{""}</div>
              <div className="border-border h-3 border-l"></div>
              <input
                type={"text"}
                className={
                  "text-md w-full border-none bg-transparent outline-none"
                }
              />
            </label>
          </div>
        </div>

        <div className="bg-layout-sidebar w-full rounded-lg shadow-inner">
          <div className="bg-layout-sidebar w-full rounded-lg shadow-inner"></div>
          <label className="flex w-full items-center gap-2 p-4">
            <div className="flex-shrink-0">{""}</div>
            <div className="border-border h-3 border-l"></div>
            <input
              type={"text"}
              className={
                "text-md w-full border-none bg-transparent outline-none"
              }
            />
          </label>
        </div>
        <div className="flex w-full gap-2">
          <div className="bg-layout-sidebar flex w-1/2 items-center justify-between gap-1 rounded-lg pl-2 shadow-inner">
            <input type="number" min={1} hidden readOnly name="timer" />
            <div className="flex items-center gap-1">
              <span className="text-md text-default">타이머 설정</span>
              <div className="border-border h-3 border-l"></div>
              <span className="text-default ml-2 text-lg font-bold">{1}</span>
            </div>
            <div className="bg-primary flex flex-col items-center justify-center rounded-r-lg p-1">
              {" "}
              <div className="my-1 w-full border-t border-[#F0F4FA2B]" />{" "}
            </div>
          </div>
          <div className="bg-layout-sidebar flex w-1/2 items-center justify-between gap-1 rounded-lg pl-2 shadow-inner">
            <input type="number" min={1} hidden readOnly name="timer" />
            <div className="flex items-center gap-1">
              <span className="text-md text-default">타이머 설정</span>
              <div className="border-border h-3 border-l"></div>
              <span className="text-default ml-2 text-lg font-bold">{1}</span>
            </div>
            <div className="bg-primary flex flex-col items-center justify-center rounded-r-lg p-1">
              {" "}
              <div className="my-1 w-full border-t border-[#F0F4FA2B]" />{" "}
            </div>
          </div>
        </div>
        <div className="mt-4 flex w-full gap-2">
          <button className="bg-secondary hover:bg-secondary-hover shadow-middle text-default w-1/2 rounded-lg px-8 py-4 font-semibold hover:text-white">
            취소
          </button>
          <button className="bg-primary hover:bg-primary-hover disabled:bg-primary-disabled shadow-middle w-1/2 rounded-lg px-8 py-4 font-semibold text-white">
            생성
          </button>
        </div>
      </div>
    </div>
  );
}

export { CreateVoteError };
