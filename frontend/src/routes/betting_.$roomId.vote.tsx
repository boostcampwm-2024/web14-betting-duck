import { createFileRoute } from "@tanstack/react-router";
import { Chat } from "@/features/chat";
import { useNavigate } from "@tanstack/react-router";
import { validateAccess } from "@/shared/lib/validateAccess";
import { responseBetRoomInfo } from "@betting-duck/shared";
import { Unauthorized } from "@/features/waiting-room/error/Unauthorized";
import { Forbidden } from "@/features/waiting-room/error/Forbidden";
import { AccessError } from "@/features/waiting-room/error/AccessError";
import { z } from "zod";

type BetRoomResponse = z.infer<typeof responseBetRoomInfo>;

interface RouteLoaderData {
  roomId: string;
  bettingRoomInfo: BetRoomResponse;
}

async function getBettingRoomInfo(roomId: string) {
  return fetch(`/api/betrooms/${roomId}`)
    .then((res) => res.json())
    .then(({ data }) => {
      const result = responseBetRoomInfo.safeParse(data);
      if (!result.success) {
        console.error(result.error.errors);
        return;
      }
      return result.data;
    });
}

let returnToken = "";
export const Route = createFileRoute("/betting_/$roomId/vote")({
  loader: async ({ params }): Promise<RouteLoaderData> => {
    const { roomId } = params;
    returnToken = roomId;

    const abortController = new AbortController();
    try {
      await validateAccess(roomId, abortController.signal);
      const bettingRoomInfo = await getBettingRoomInfo(roomId);
      if (!bettingRoomInfo) {
        throw new Error("베팅 룸 데이터를 불러오는데 실패했습니다.");
      }
      return { roomId, bettingRoomInfo };
    } finally {
      abortController.abort();
    }
  },
  component: RouteComponent,
  errorComponent: ({ error }) => {
    if (error instanceof AccessError) {
      if (error.code === "UNAUTHORIZED") {
        return (
          <Unauthorized
            error={error}
            returnToken={returnToken}
            isBettingProgress={true}
          >
            <ErrorComponent error={error} />
          </Unauthorized>
        );
      }
      return (
        <Forbidden error={error}>
          <ErrorComponent error={error} />
        </Forbidden>
      );
    }
    return <ErrorComponent error={error} />;
  },
});

function RouteComponent() {
  return <Chat />;
}

function ErrorComponent({ error }: { error: Error }) {
  const navigate = useNavigate();

  return (
    <div
      className="text-layout-main absolute left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center gap-16 px-8"
      style={{
        backgroundColor: "oklch(37.92% 0.039 257.29 / 70%)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="flex flex-col items-center">
        <span>{error.message}</span>
        <h1 className="text-xl font-extrabold">로그인 후 이용 해주세요!</h1>
      </div>
      <div className="text-layout-main pt-16">
        <p className="text-lg font-normal">
          채팅 기능을 이용하기 위해서는 로그인이 필요합니다!
        </p>
        <p>
          로그인 이 귀찮으시다면{" "}
          <span className="bg-layout-main text-default mx-1 rounded-sm px-1 py-1 text-lg font-extrabold">
            비회원
          </span>{" "}
          로그인을 해주세요!
        </p>
      </div>
      <button
        className="text-decoration-none text-layout-main inline-block w-full cursor-pointer rounded-[15px] border border-[rgba(255,255,255,0.1)] bg-[oklch(49.07%_0.2412_292.58/30%)] px-8 py-4 text-[14px] uppercase tracking-[2px] backdrop-blur-[30px]"
        onClick={() => {
          navigate({
            to: "/demo-login",
          });
        }}
      >
        로그인 하러 가기
      </button>
    </div>
  );
}
