import { useUserContext } from "@/shared/hooks/useUserContext";
import { LogoIcon } from "@/shared/icons";
import { Image } from "@/shared/components/Image";
import waitingUserImage from "@assets/images/waiting-user.png";
import { Link } from "@tanstack/react-router";

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
  const { userInfo } = useUserContext();
  const { nickname } = userInfo;

  return (
    <div className="header flex-start flex items-center gap-2 pl-[60px]">
      <Link
        to={"/"}
        className="flex w-full select-none flex-row items-center gap-2"
      >
        <LogoIcon />
        <h1>Betting Duck</h1>
      </Link>
      {nickname && <UserInfo nickname={nickname} />}
    </div>
  );
}

export { RootHeader };
