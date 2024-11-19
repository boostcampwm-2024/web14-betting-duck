import { useChat } from "@/features/chat/hook/use-chat";
import React from "react";

function InputBar() {
  const { socket } = useChat();

  function handleKeyDown(e: React.KeyboardEvent<HTMLPreElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const text = e.currentTarget.textContent;
      if (text && socket.isConnected) {
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
    }
  }

  return (
    <div className="relative flex h-full w-full items-center">
      <pre
        className={`overflow-wrap-break-word ml-1 flex h-full max-h-[40px] min-h-[20px] w-full resize-none items-center overflow-y-auto whitespace-normal break-words break-all rounded-lg border-none bg-slate-100 px-3 py-2 font-normal leading-5 outline-none`}
        contentEditable="true"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export { InputBar };
