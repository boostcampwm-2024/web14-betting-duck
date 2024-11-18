import { DuckIcon } from "@/assets/icons/DuckIcon";

function BettingForm() {
  return (
    <div className="flex gap-6">
      <div className="bg-bettingBlue-behind text-bettingBlue relative flex min-h-[40px] w-[50cqw] rounded-lg">
        <div className="mx-4 flex min-w-[24px] items-center justify-center">
          <DuckIcon width={36} height={36} className="" />
        </div>
        <pre
          className="flex w-full items-center justify-end whitespace-normal break-all pr-2 font-extrabold"
          contentEditable
        />
        <button
          type="button"
          className={
            "bg-bettingBlue-button bg-gradient-winning-button relative z-10 min-w-[74px] rounded-lg py-2 text-white"
          }
        >
          투표
        </button>
      </div>
      <div className="bg-bettingPink-disabled text-bettingPink relative flex min-h-[40px] w-[50cqw] rounded-lg">
        <div className="mx-4 flex min-w-[24px] items-center justify-center">
          <DuckIcon width={36} height={36} className="" />
        </div>
        <pre
          className="flex w-full items-center justify-end whitespace-normal break-all pr-2 font-extrabold"
          contentEditable
        />
        <button
          type="button"
          className={
            "bg-bettingBlue-button bg-gradient-losing-button relative z-10 min-w-[74px] rounded-lg py-2 text-white"
          }
        >
          투표
        </button>
      </div>
    </div>
  );
}

export { BettingForm };
