import { LogoIcon } from "@/shared/icons";
import { Image } from "@/shared/components/Image";
import waitingUserImage from "@assets/images/waiting-user.png";
import { Link } from "@tanstack/react-router";
import React from "react";
import { getUserInfo } from "@/features/betting-page/api/getUserInfo";
import { responseUserInfoSchema } from "@betting-duck/shared";
import { useUserContext } from "@/shared/hooks/useUserContext";

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
  const [nickname, setNickname] = React.useState<string>(
    userInfo.nickname ?? "",
  );
  React.useEffect(() => {
    (async () => {
      const userInfo = await getUserInfo();
      const parsedUserInfo = responseUserInfoSchema.safeParse(userInfo);
      console.log(userInfo);
      if (parsedUserInfo.success) {
        setNickname(parsedUserInfo.data.nickname);
      }
    })();
  }, []);

  React.useEffect(() => {
    setNickname(userInfo.nickname ?? "");
  }, [userInfo]);

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
