import { MessageList } from "./ui/MessageList";

const mockMessages = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  text: `This is message number ${i + 1}. Adding some extra text to make the message longer and show scrolling better.`,
  user: i % 2 === 0 ? "User A" : "User B",
}));

function ChatMessages() {
  return (
    <MessageList>
      {mockMessages.map((msg) => (
        <div
          key={msg.id}
          className={`rounded-lg p-3 ${
            msg.user === "User A"
              ? "ml-auto max-w-[80%] rounded-r-lg rounded-t-lg bg-purple-100"
              : "mr-auto max-w-[80%] bg-gray-100"
          }`}
        >
          <div className="text-sm font-semibold">{msg.user}</div>
          <div>{msg.text}</div>
        </div>
      ))}
    </MessageList>
  );
}

export { ChatMessages };
