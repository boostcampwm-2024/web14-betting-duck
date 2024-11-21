import { useSocketIO } from "@/shared/hooks/use-socket-io";
import waitingUserImage from "@assets/images/waiting-user.png";
import React from "react";

type ParticipantInfo = {
  nickname: string;
  joinAt: string;
};

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

function ParticipantsList({ roomId }: { roomId: string }) {
  const [participants, setParticipants] = React.useState<ParticipantInfo[]>([]);
  const prevParticipantsRef = React.useRef<Set<string>>(new Set());

  const socket = useSocketIO({
    url: "/api/betting",
    onConnect: () => {
      console.log("투표 대기 방에서 소켓 연결을 성공 했습니다.");
    },
    onDisconnect: (reason) => {
      console.error("투표 대기 방에서 소켓이 끊어졌습니다.");
      console.error(reason);
    },
    onError: (error) => {
      console.error("투표 대기 방에서 소켓 에러가 발생했습니다.");
      console.error(error);
    },
  });

  React.useEffect(() => {
    if (!prevParticipantsRef.current) {
      prevParticipantsRef.current = new Set<string>();
    }

    socket.on("fetchRoomUsers", (data) => {
      if (
        Array.isArray(data) &&
        data.every(
          (item) =>
            typeof item.nickname === "string" &&
            typeof item.joinAt === "string",
        )
      ) {
        const newParticipants: ParticipantInfo[] = [];

        data.forEach((item) => {
          if (
            prevParticipantsRef.current &&
            !prevParticipantsRef.current.has(item.nickname)
          ) {
            prevParticipantsRef.current.add(item.nickname);
            newParticipants.push({
              nickname: item.nickname,
              joinAt: item.joinAt,
            });
          }
        });

        if (newParticipants.length > 0) {
          setParticipants((prev) => [...prev, ...newParticipants]);
        }
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
        {participants.map(({ nickname }, i) => (
          <User key={`${nickname}-${i}th-player`} nickname={nickname} />
        ))}
      </ul>
    </div>
  );
}

export { ParticipantsList };
