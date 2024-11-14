import { EmoticomButton } from "./ui/EmoticonButton";
import { InputBar } from "./ui/InputBar";
import { VoteButton } from "./ui/VoteButton";

function ChatInput() {
  return (
    <div className="bg-secondary-container flex h-full max-h-[60px] w-full flex-row items-center justify-between gap-4 py-3 pl-2 pr-4">
      <EmoticomButton />
      <InputBar />
      <VoteButton />
    </div>
  );
}

export { ChatInput };
