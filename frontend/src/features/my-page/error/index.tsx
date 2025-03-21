import { DuckCoinIcon } from "@/shared/icons";

function ErrorMyPage() {
  return (
    <div className="w-ful h-h-full bg-layout-main flex flex-col items-center justify-center gap-16">
      <div className="flex flex-col items-center justify-center pb-6">
        <h1 className="text-2xl font-extrabold">마이 페이지</h1>
        <p className="text-lg">오리를 구매해서 페이지를 꾸며보세요</p>
      </div>
      <div className="flex w-full items-center justify-center gap-4">
        <DuckCoinIcon width={32} height={32} />
        <span className="text-2xl font-bold">{0}</span>
      </div>
      <div className="w-full px-5"></div>
      <div className="flex gap-8">
        <button className="bg-secondary text-default border-default-hover flex items-center gap-4 rounded-xl border-2 px-6 py-3 text-xl font-bold">
          <DuckCoinIcon width={32} height={33} />
          <span>-30</span>
        </button>
        <button className="bg-default text-layout-main rounded-xl px-6 py-3 text-xl">
          방 만들러 가기
        </button>
      </div>
    </div>
  );
}

export { ErrorMyPage };
