import { CopyIcon, LinkIcon } from "@/assets/icons";
import { cn } from "@/shared/misc";

function ShareLinkCard() {
  return (
    <div
      className={cn(
        "primary-container",
        "flex w-full flex-row items-center justify-between gap-4",
      )}
    >
      <LinkIcon />
      <div className="scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 max-w-[310px] overflow-x-scroll whitespace-nowrap">
        https://github.com/boostcampwm-2024/web14-betting-duck
      </div>
      <button className={cn("", "outline-none")}>
        <CopyIcon />
      </button>
    </div>
  );
}

export { ShareLinkCard };
