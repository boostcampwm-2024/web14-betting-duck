import waitingUserImage from "@assets/images/waiting-user.avif";
import React from "react";
import { useWaitingContext } from "../hooks/use-waiting-context";
import { z } from "zod";
import { useParams } from "@tanstack/react-router";

type ParticipantInfo = string;

const ParticipantInfoSchema = z.array(z.string()).nonempty();

function User({ nickname }: { nickname: string }) {
  return (
    <li className="bg-layout-main h-fit w-fit place-items-center gap-2 rounded-md px-2 pb-2 pt-4 shadow-sm">
      <img
        src={waitingUserImage}
        width={20}
        height={15}
        alt="대기 중인 사용자 이미지"
        loading="eager"
        decoding="sync"
        className="flex-shrink-0 object-contain"
        // @ts-expect-error fetchpriority is not yet recognized by TypeScript
        fetchpriority="high" // 소문자로 수정
      />
      <div className="group relative mt-auto w-full max-w-[100px] truncate text-end text-lg font-bold">
        {nickname}
      </div>
    </li>
  );
}

function ParticipantsList() {
  const { roomId } = useParams({
    from: "/betting_/$roomId/waiting",
  });
  const { socket } = useWaitingContext();
  const [participantsList, setParticipantsList] = React.useState<
    Set<ParticipantInfo>
  >(new Set());

  React.useEffect(() => {
    socket.on("fetchRoomUsers", (data) => {
      const parsedData = ParticipantInfoSchema.safeParse(data);
      if (!parsedData.success) {
        return;
      }
      const currentParticipantsList = parsedData.data;

      if (
        currentParticipantsList.length !== participantsList.size ||
        currentParticipantsList.every(
          (participant, i) => currentParticipantsList[i] === participant,
        )
      ) {
        setParticipantsList(
          (prev) => new Set([...prev, ...currentParticipantsList]),
        );
      }
    });

    return () => {
      socket.off("fetchRoomUsers");
    };
  }, [socket, setParticipantsList, participantsList]);

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
    <div className="bg-secondary flex select-none flex-col gap-4 rounded-lg px-6 pb-4 pt-2 shadow-inner">
      <div className="font-extrabold">참가 중인 사용자</div>
      <ul className="max flex w-full max-w-[366px] flex-row gap-4 overflow-x-scroll pb-2 font-bold">
        {[...participantsList.values()].map((nickname, i) => (
          <User key={`${nickname}-${i}th-player`} nickname={nickname} />
        ))}
      </ul>
    </div>
  );
}

export { ParticipantsList };
