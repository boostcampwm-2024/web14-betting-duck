import { DuckCoinIcon } from "@/shared/icons";
import { useNavigate } from "@tanstack/react-router";
import { Pond } from "./ui/Pond";
import { FallingDuck } from "./ui/FallingDuck";
import React from "react";

function MyPage() {
  const navigate = useNavigate();
  const [duck, setDuck] = React.useState(0);
  const [ducks, setDucks] = React.useState([FallingDuck]);

  function addDuck() {
    setDucks([...ducks, FallingDuck]);
  }

  React.useEffect(() => {
    (async () => {
      const userInfoResponse = await fetch("/api/users/userInfo");
      if (!userInfoResponse.ok) {
        throw new Error("사용자 정보를 불러오는데 실패했습니다");
      }
      const userInfo = await userInfoResponse.json();
      setDuck(userInfo.data.duck);
    })();
  }, []);

  return (
    <div className="w-ful bg-layout-main flex flex-col items-center justify-between gap-2">
      <div className="flex h-full w-full flex-col items-center justify-evenly">
        <div className="flex flex-col items-center justify-center pb-6">
          <h1 className="text-2xl font-extrabold">마이 페이지</h1>
          <p className="text-lg">오리를 구매해서 페이지를 꾸며보세요</p>
        </div>
        <div className="flex w-full items-center justify-center gap-4">
          <DuckCoinIcon width={32} height={32} />
          <span className="text-2xl font-bold">{duck ?? 0}</span>
        </div>
        <React.Suspense fallback={null}>
          <div className="min-h-[17cqh] w-full max-w-[460px] px-5">
            <Pond ducks={ducks} />
          </div>
        </React.Suspense>
        <div className="flex gap-8">
          <button
            onClick={() => addDuck()}
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
