import { LogoIcon } from "@/shared/icons";
import { Image } from "@/shared/components/Image";
import waitingUserImage from "@assets/images/waiting-user.avif";
import { Link } from "@tanstack/react-router";

function UserInfo({ nickname }: { nickname: string }) {
  return (
    <div className="flex h-fit w-fit select-none items-center justify-end gap-3 p-4 font-bold">
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

function RootHeader({ nickname }: { nickname: string }) {
  return (
    <div className="header flex-start flex items-center justify-between gap-2 pl-[60px]">
      <Link
        to={"/"}
        className="flex w-fit select-none flex-row items-center gap-2"
      >
        <LogoIcon />
        <h1>Betting Duck</h1>
      </Link>
      {nickname ? <UserInfo nickname={nickname} /> : null}
    </div>
  );
}

export { RootHeader };
