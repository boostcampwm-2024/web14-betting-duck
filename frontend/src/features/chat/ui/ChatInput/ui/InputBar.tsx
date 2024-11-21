import { UserInfo } from "@/app/provider/UserProvider";
import { useChat } from "@/features/chat/hook/use-chat";
import { useUser } from "@/shared/hooks/use-user";
import React from "react";

function generateRandomNickname(userInfo: UserInfo) {
  const adjectives = [
    "춤추는",
    "잠든",
    "꿈꾸는",
    "웃는",
    "날아가는",
    "바쁜",
    "느린",
    "귀여운",
    "신비한",
    "힙한",
    "멋진",
    "똑똑한",
    "용감한",
    "아기",
    "행복한",
  ];

  const nouns = [
    "우주인",
    "마법사",
    "요정",
    "용",
    "음악가",
    "과학자",
    "탐험가",
    "화가",
    "요리사",
    "작가",
    "도둑",
    "기사",
    "해적",
    "수호자",
    "악당",
  ];

  if (!userInfo.nickname) {
    const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${randomAdj} ${randomNoun}`;
  }

  return userInfo.nickname;
}

function InputBar() {
  const [isComposing, setComposing] = React.useState(false);
  const [text, setText] = React.useState("");
  const { socket } = useChat();
  const { userInfo } = useUser();

  function handleInput(e: React.FormEvent<HTMLPreElement>) {
    if (!isComposing) {
      const content = e.currentTarget.textContent ?? "";
      setText(content);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLPreElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      if (!isComposing && text.trim().length > 0 && socket.isConnected) {
        socket.emit("sendMessage", {
          sender: {
            nickname: generateRandomNickname(userInfo),
          },
          channel: {
            roomId: "123",
          },
          message: text.trim(),
        });

        setText("");
        e.currentTarget.textContent = "";
      }
    }
  }

  return (
    <React.Fragment>
      <div className="relative flex h-full w-full items-center">
        <pre
          className={`overflow-wrap-break-word ml-1 flex h-full min-h-[20px] w-full max-w-full resize-none items-center overflow-y-hidden whitespace-normal break-words break-all rounded-lg border-none bg-slate-100 px-3 py-2 font-normal leading-5 text-inherit outline-none`}
          contentEditable="true"
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setComposing(true)}
          onCompositionEnd={(e) => {
            const content = e.currentTarget.textContent ?? "";
            setText(content);
            setComposing(false);
          }}
        />
      </div>
    </React.Fragment>
  );
}

export { InputBar };
