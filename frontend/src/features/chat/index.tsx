import { ChatHeader } from "@/features/chat/ui/ChatHeader";
import { ChatInput } from "@/features/chat/ui/ChatInput";
import { ChatMessages } from "@/features/chat/ui/ChatMessages";
import { ChatProvider } from "./provider/ChatProvider";
import { useNavigate } from "@tanstack/react-router";

function Chat({ isError = false, error }: { isError: boolean; error: Error }) {
  return (
    <ChatProvider>
      <div className="bg-layout-main relative flex flex-col justify-end pt-4">
        {isError && <ErrorComponent error={error} />}
        <ChatHeader />
        <ChatMessages />
        <ChatInput />
      </div>
    </ChatProvider>
  );
}

export { Chat };

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
