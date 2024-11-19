import React from "react";
import { Image } from "@/shared/components/Image";
import userPlusImage from "@/assets/images/user-plus.png";

function GuestFooter() {
  return (
    <React.Fragment>
      <button className="bg-default text-layout-main flex w-full items-center justify-center gap-4 rounded-lg py-2 text-lg font-extrabold">
        <Image
          src={userPlusImage}
          width={24}
          height={24}
          alt="사용자 추가 아이콘 이미지"
        />
        회원가입하고 코인 받기
      </button>
      <span className="text-lg font-bold">
        회원가입을 하시면 얻은 코인을 모두 얻을 수 있고 마이페이지를 이용하실 수
        있습니다!
      </span>
    </React.Fragment>
  );
}

export { GuestFooter };
