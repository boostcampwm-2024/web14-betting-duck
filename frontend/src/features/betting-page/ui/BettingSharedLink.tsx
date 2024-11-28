import { CopyIcon, LinkIcon } from "@/shared/icons";
import { ConfirmIcon } from "@/shared/icons/ConfirmIcon";
import { cn } from "@/shared/misc";
import React from "react";
import { useLocation } from "@tanstack/react-router";

function BettingSharedLink() {
  const [copied, setCopied] = React.useState(false);
  const location = useLocation();
  let url = `${window.location.origin}${location.href}`;
  if (url.includes("vote")) url = url.replace("vote", "waiting");

  function copyfallback() {
    const textArea = document.createElement("textarea");
    textArea.value = url;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      console.error("링크를 복사하는데 실패했습니다", err);
    }
    textArea.remove();
  }

  async function handleCopyLink() {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
      } else {
        copyfallback();
      }
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error("링크를 복사하는데 실패했습니다.", error);
    }
  }

  return (
    <div
      className={
        "bg-secondary flex w-full flex-row items-center justify-between gap-4 px-4 py-3"
      }
    >
      <LinkIcon className="text-secondary-hover" />
      <div className="text-default bg-layout-main text-md max-w-[70cqw] overflow-x-scroll whitespace-nowrap rounded-md px-4 py-1 font-extrabold">
        {url}
      </div>
      <button
        disabled={copied}
        className={cn(
          "hover:border-layout-main hover:bg-secondary-hover hover:text-layout-main rounded-md border border-transparent p-2 outline-none transition",
          copied
            ? "hover:text-layout-main rounded-md border border-transparent bg-green-500 p-2 text-green-100 outline-none transition hover:bg-green-500"
            : "",
        )}
        onClick={handleCopyLink}
      >
        {copied ? (
          <ConfirmIcon width={16} height={16} />
        ) : (
          <CopyIcon width={16} height={16} />
        )}
      </button>
    </div>
  );
}

export { BettingSharedLink };
