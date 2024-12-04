import React from "react";

interface MessageProps {
  sender: {
    nickname: string;
  };
  message: string;
  color: string;
  radius: string;
}

const Message: React.FC<MessageProps> = (
  { sender, message, color, radius }: MessageProps,
  index: number,
) => {
  const firstMessageRegexp = /^(.+)님이 입장하셨습니다\.$/;
  const firstMessage = firstMessageRegexp.exec(message);
  if (firstMessage) {
    return (
      <div key={sender.nickname + index} className="flex justify-center">
        <div
          className={`max-w-[100%] ${radius} flex flex-row items-start gap-4 py-1`}
        >
          <div className="w-full">
            <span
              className={`${color} text-md mr-3 whitespace-nowrap font-bold`}
            >
              {firstMessage[1]}
            </span>
            <span className="text-default break-words">
              님이 입장하셨습니다.
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div key={sender.nickname + index} className="flex">
      <div
        className={`max-w-[80%] ${radius} flex flex-row items-start gap-4 bg-white p-3 shadow-sm`}
      >
        <div className="">
          <span className={`${color} text-md mr-3 whitespace-nowrap font-bold`}>
            {sender.nickname}
          </span>
          <span className="break-words text-gray-700">{message}</span>
        </div>
      </div>
    </div>
  );
};

export default Message;
