import { Suspense, lazy } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { userInfoQueries } from "@/shared/lib/auth/authQuery";
import { AnimatedDuckCount } from "./AnimatedDuckCount";
import { PurchaseButton } from "./PurchaseButton";

const Pond = lazy(() => import("./Pond"));

function MyPage() {
  const { data: authData } = useSuspenseQuery({
    queryKey: userInfoQueries.queryKey,
    queryFn: userInfoQueries.queryFn,
  });
  const navigate = useNavigate();

  return (
    <div className="w-ful bg-layout-main relative flex flex-col items-center justify-between gap-2">
      <div className="flex h-full w-full flex-col items-center justify-evenly">
        <div className="z-20 flex flex-col items-center justify-center pb-6">
          <h1 className="text-2xl font-extrabold">마이 페이지</h1>
          <p className="text-lg">오리를 구매해서 페이지를 꾸며보세요</p>
        </div>
        <AnimatedDuckCount />
        <Suspense fallback={null}>
          <div className="absolute left-0 top-0 z-10 h-full max-h-[600px] w-full max-w-[460px] px-5">
            <Pond realDuck={authData.realDuck} />
          </div>
        </Suspense>
        <div className="z-20 flex gap-8">
          <PurchaseButton authData={authData} />
          <button
            className="bg-default text-layout-main rounded-xl px-6 py-3 text-xl"
            onClick={() => navigate({ to: "/create-vote", replace: true })}
          >
            방 만들러 가기
          </button>
        </div>
      </div>
    </div>
  );
}

export { MyPage };
