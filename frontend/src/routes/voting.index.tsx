import React from "react";
import { WaitingError } from "@/features/waiting-room/ui/WaitingError";
import { useUser } from "@/shared/hooks/use-user";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/voting/")({
  component: RouteComponent,
  errorComponent: ({ error }) => (
    <ErrorComponent error={error}>
      <WaitingError />
    </ErrorComponent>
  ),
});

function RouteComponent() {
  const navigate = useNavigate();
  const { userInfo } = useUser();
  const { roomId } = userInfo;
  if (!roomId) throw new Error("참여하고 있는 방이 없습니다.");
  navigate({
    to: `/voting/${roomId}/waiting`,
  });
  return "Hello /voting!";
}

function ErrorComponent({
  children,
  error,
}: {
  children: React.ReactNode;
  error: Error;
}) {
  const urlRef = React.useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  return (
    <div className="bg-layout-main relative flex flex-col justify-end pt-4">
      <div
        className="text-layout-main absolute left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center gap-16 px-8"
        style={{
          backgroundColor: "oklch(37.92% 0.039 257.29 / 70%)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-extrabold">{error.message}</h1>
        </div>
        <div className="text-layout-main flex flex-col gap-4 pt-16">
          <p className="text-lg font-normal">
            방 참여하기를 이용하기 위해서는{" "}
            <span className="bg-layout-main text-default mx-1 rounded-sm px-1 py-1 text-lg font-extrabold">
              방 참여
            </span>
            가 필요합니다!
          </p>
          <input
            id="enter-room-url"
            ref={urlRef}
            className="bg-layout-main text-default h-fit w-full overflow-x-hidden rounded-md px-6 py-2 font-bold outline-none"
            type="url"
            placeholder="https://example.com"
          />
          <button
            type="button"
            className="text-decoration-none text-layout-main inline-block w-full cursor-pointer rounded-[15px] border border-[rgba(255,255,255,0.1)] bg-[oklch(49.07%_0.2412_292.58/30%)] px-8 py-4 text-[14px] font-extrabold uppercase tracking-[2px] backdrop-blur-[30px]"
            onClick={() => {
              window.location.href = urlRef.current?.value || "/";
            }}
          >
            이동 하기
          </button>
          <div className="hidden">올바른 URL을 입력해주세요.</div>
        </div>
        <div className="flex flex-col">
          <div>
            <p className="text-lg font-normal">
              초대 받은 방이 없으시다면
              <span className="bg-layout-main text-default mx-1 rounded-sm px-1 py-1 text-lg font-extrabold">
                방을 생성
              </span>
              하고 다른 사용자들을 초대 해보세요!
            </p>
          </div>
          <button
            type="button"
            className="text-decoration-none text-layout-main inline-block w-full cursor-pointer rounded-[15px] border border-[rgba(255,255,255,0.1)] bg-[oklch(49.07%_0.2412_292.58/30%)] px-8 py-4 text-[14px] font-extrabold uppercase tracking-[2px] backdrop-blur-[30px]"
            onClick={() => {
              navigate({
                to: "/create-vote",
              });
            }}
          >
            방 생성하러 가기
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}
