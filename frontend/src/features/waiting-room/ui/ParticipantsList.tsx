import waitingUserImage from "@assets/images/waiting-user.png";

function ParticipantsList() {
  return (
    <div className="bg-secondary flex flex-col gap-4 rounded-lg px-6 pb-4 pt-2 shadow-inner">
      <div className="font-extrabold">참가 중인 사용자</div>
      <ul className="max flex w-full max-w-[366px] flex-row gap-4 overflow-x-scroll font-bold">
        <li className="bg-layout-main h-fit w-fit place-items-center gap-2 rounded-md px-2 pb-2 pt-4 shadow-sm">
          <img
            src={waitingUserImage}
            width={20}
            height={15}
            alt="대기 중인 사용자 이미지"
            loading="lazy"
            decoding="async"
          />
          <div className="group relative mt-auto w-full max-w-[100px] truncate text-end text-lg font-bold">
            ussa1aaaaaaaaaaa
          </div>
        </li>
      </ul>
    </div>
  );
}

export { ParticipantsList };
