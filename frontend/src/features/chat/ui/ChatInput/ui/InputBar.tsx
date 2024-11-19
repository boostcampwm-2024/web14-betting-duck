import { useChat } from "@/features/chat/hook/use-chat";
import React from "react";

function InputBar() {
  const [isComposing, setComposing] = React.useState(false);
  const [text, setText] = React.useState("");
  const { socket } = useChat();

  function handleInput(e: React.FormEvent<HTMLPreElement>) {
    if (!isComposing) {
      setText(e.currentTarget.textContent ?? text);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLPreElement>) {
    if (e.shiftKey && e.key === "Enter") {
      e.preventDefault();
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      if (text.length > 0 && socket.isConnected) {
        socket.emit("sendMessage", {
          sender: {
            nickname: "nickname",
          },
          channel: {
            roomId: "123",
          },
          message: text,
        });
        e.currentTarget.textContent = "";
      }
      return;
    }
  }

  return (
    <div className="relative flex h-full w-full items-center">
      <pre
        className={`overflow-wrap-break-word ml-1 flex h-full min-h-[20px] w-full max-w-full resize-none items-center overflow-y-hidden whitespace-normal break-words break-all rounded-lg border-none bg-slate-100 px-3 py-2 font-normal leading-5 text-inherit outline-none`}
        contentEditable="true"
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onCompositionStart={() => setComposing(true)}
        onCompositionEnd={(e) => {
          setComposing(false);
          setText(e.currentTarget.textContent ?? text);
        }}
      />
    </div>
  );
}

export { InputBar };
