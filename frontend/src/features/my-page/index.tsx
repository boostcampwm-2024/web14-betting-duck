import { DuckCoinIcon } from "@/shared/icons";
import { useNavigate } from "@tanstack/react-router";
import { Pond } from "./ui/Pond";
import { FallingDuck } from "./ui/FallingDuck";
import React from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { authQueries } from "@/shared/lib/auth/authQuery";
import { AnimatedDuckCount } from "./ui/AnimatedDuckCount";

function MyPage() {
  const { data: authData } = useSuspenseQuery({
    queryKey: authQueries.queryKey,
    queryFn: authQueries.queryFn,
  });

  const navigate = useNavigate();
  const [currentDuck, setCurrentDuck] = React.useState(authData.userInfo.duck);
  const [ducks, setDucks] = React.useState([FallingDuck]);

  async function purchaseDuck() {
    // const response = await fetch("/api/users/purchaseduck");
    // if (!response.ok) {
    //   console.error("Failed to purchase duck");
    //   return;
    // }
    // const json = await response.json();
    // console.log(json);

    setDucks([...ducks, FallingDuck]);
    setCurrentDuck(currentDuck - 30);
  }

  return (
    <div className="w-ful bg-layout-main relative flex flex-col items-center justify-between gap-2">
      <div className="flex h-full w-full flex-col items-center justify-evenly">
        <div className="z-20 flex flex-col items-center justify-center pb-6">
          <h1 className="text-2xl font-extrabold">마이 페이지</h1>
          <p className="text-lg">오리를 구매해서 페이지를 꾸며보세요</p>
        </div>
        <AnimatedDuckCount value={currentDuck} DuckCoinIcon={DuckCoinIcon} />
        <React.Suspense fallback={null}>
          <div className="absolute left-0 top-0 z-10 h-full max-h-[600px] w-full max-w-[460px] px-5">
            <Pond ducks={ducks} />
          </div>
        </React.Suspense>
        <div className="z-20 flex gap-8">
          <button
            onClick={async () => purchaseDuck()}
            className="bg-secondary text-default border-default-hover flex items-center gap-4 rounded-xl border-2 px-6 py-3 text-xl font-bold"
          >
            <DuckCoinIcon width={32} height={33} />
            <span>-30</span>
          </button>
          <button
            className="bg-default text-layout-main rounded-xl px-6 py-3 text-xl"
            onClick={() =>
              navigate({
                to: "/create-vote",
              })
            }
          >
            방 만들러 가기
          </button>
        </div>
      </div>
    </div>
  );
}

export { MyPage };
