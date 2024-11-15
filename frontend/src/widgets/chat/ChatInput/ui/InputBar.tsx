import { useSocketIO } from "@/shared/hooks/use-socket-io";
import React from "react";

function InputBar() {
  const socket = useSocketIO({
    onConnect: () => {
      console.log("소켓 연결 성공");
    },
    onDisconnect: (reason) => {
      console.log("소켓 연결 끊김", reason);
    },
  });

  React.useEffect(() => {
    if (socket.isConnected) {
      socket.emit("joinRoom", {
        sender: {
          nickname: "nickname",
        },
        channel: {
          roomId: "123",
        },
        message: "테스트 메시지 잘가나요?",
      });
    }
  }, [socket.isConnected]);

  React.useEffect(() => {
    if (socket.isConnected) {
      socket.on("error", (e) => console.log("error", e));
    }
  }, [socket.isConnected]);

  React.useEffect(() => {
    if (socket.isConnected) {
      const handleMessage = (data: unknown) => {
        console.log("receiveMessage", data);
      };

      socket.on("message", handleMessage);

      // cleanup 함수 추가
      return () => {
        socket.on("message", handleMessage);
      };
    }
  }, [socket.isConnected]);

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
        className={`font-nanum-b overflow-wrap-break-word ml-1 flex h-full max-h-[40px] min-h-[20px] w-full resize-none items-center overflow-y-auto whitespace-normal break-words break-all rounded-lg border-none bg-slate-100 px-3 py-2 leading-5 outline-none`}
        contentEditable="true"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export { InputBar };
