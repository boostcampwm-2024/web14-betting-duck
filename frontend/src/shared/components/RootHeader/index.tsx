import { LogoIcon } from "@/shared/icons";
import { Image } from "@/shared/components/Image";
import waitingUserImage from "@assets/images/waiting-user.png";
import { Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { authQueries } from "@/shared/lib/auth/authQuery";

function UserInfo({ nickname }: { nickname: string }) {
  return (
    <div className="flex h-fit w-full select-none items-center justify-end gap-3 p-4 font-bold">
      <div>
        <Image
          src={waitingUserImage}
          width={20}
          height={15}
          alt="대기 중인 사용자 이미지"
        />
      </div>
      {nickname}
    </div>
  );
}

function RootHeader() {
  const { data: authData, status } = useSuspenseQuery({
    queryKey: authQueries.queryKey,
    queryFn: authQueries.queryFn,
  });
  const nickname = authData?.userInfo?.nickname;

  if (status !== "success" || !authData?.userInfo?.nickname) {
    return (
      <div className="header flex-start flex items-center gap-2 pl-[60px]">
        <Link
          to={"/"}
          className="flex w-full select-none flex-row items-center gap-2"
        >
          <LogoIcon />
          <h1>Betting Duck</h1>
        </Link>
      </div>
    );
  }

  return (
    <div className="header flex-start flex items-center gap-2 pl-[60px]">
      <Link
        to={"/"}
        className="flex w-full select-none flex-row items-center gap-2"
      >
        <LogoIcon />
        <h1>Betting Duck</h1>
      </Link>
      <UserInfo nickname={nickname} />
    </div>
  );
}

export { RootHeader };
