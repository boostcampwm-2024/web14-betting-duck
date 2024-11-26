import waitingUserImage from "@assets/images/waiting-user.png";
import React from "react";
import { useWaitingContext } from "../hooks/use-waiting-context";

type ParticipantInfo = string;

function isParticipantInfo(info: unknown): info is ParticipantInfo[] {
  if (Array.isArray(info)) {
    return info.every((item) => typeof item === "string" && item !== null);
  }
  return false;
}

function isUpdatedParticipantInfo(
  prev: ParticipantInfo[],
  next: ParticipantInfo[],
) {
  return next.some((info) => !prev.includes(info));
}

function User({ nickname }: { nickname: string }) {
  return (
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
        {nickname}
      </div>
    </li>
  );
}

function ParticipantsList() {
  const { socket, roomId } = useWaitingContext();
  const [participants, setParticipants] = React.useState<ParticipantInfo[]>([]);
  const prevParticipantsRef = React.useRef<ParticipantInfo[]>([]);

  React.useEffect(() => {
    socket.on("fetchRoomUsers", (data) => {
      if (
        isParticipantInfo(data) &&
        isUpdatedParticipantInfo(prevParticipantsRef.current, data)
      ) {
        setParticipants(data);
        prevParticipantsRef.current = data;
      }
    });

    return () => {
      socket.off("fetchRoomUsers");
    };
  }, [socket]);

  React.useEffect(() => {
    socket.emit("joinRoom", {
      channel: {
        roomId,
      },
    });

    return () => {
      socket.emit("leaveRoom", {
        roomId,
      });
    };
  }, [socket, roomId]);

  return (
    <div className="bg-secondary flex flex-col gap-4 rounded-lg px-6 pb-4 pt-2 shadow-inner">
      <div className="font-extrabold">참가 중인 사용자</div>
      <ul className="max flex w-full max-w-[366px] flex-row gap-4 overflow-x-scroll font-bold">
        {participants.map((nickname, i) => (
          <User key={`${nickname}-${i}th-player`} nickname={nickname} />
        ))}
      </ul>
    </div>
  );
}

export { ParticipantsList };
