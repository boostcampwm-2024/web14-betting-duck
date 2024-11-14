import { cn } from "@/shared/misc";
import waitingUserImage from "@assets/images/waiting-user.png";

function ParticipantsList() {
  return (
    <div className={cn("primary-container", "bg-primary-container")}>
      <div className="font-nanum-eb">참가 중인 사용자</div>
      <ul className="font-nanum-b max flex w-full max-w-[366px] flex-row gap-4 overflow-x-scroll">
        <li className="flex h-fit w-fit flex-col items-center justify-center gap-2">
          <img
            src={waitingUserImage}
            width={20}
            height={15}
            alt="대기 중인 사용자 이미지"
            loading="lazy"
            decoding="async"
          />
          <span className="tet text-s">ussa1</span>
        </li>
      </ul>
    </div>
  );
}

export { ParticipantsList };
