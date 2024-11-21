import { useUser } from "@/shared/hooks/use-user";
import { LogoIcon } from "@/shared/icons";
import { Image } from "@/shared/components/Image";
import waitingUserImage from "@assets/images/waiting-user.png";

function UserInfo({ nickname }: { nickname: string }) {
  return (
    <div className="flex h-fit w-full items-center justify-end gap-3 p-4 font-bold">
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
  const { userInfo } = useUser();
  const { nickname } = userInfo;

  return (
    <div className="header flex-start flex items-center gap-2 pl-[60px]">
      <div className="flex w-full flex-row items-center gap-2">
        <LogoIcon />
        <h1>Betting Duck</h1>
      </div>
      {nickname && <UserInfo nickname={nickname} />}
    </div>
  );
}

export { RootHeader };
