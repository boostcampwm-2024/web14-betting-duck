import { cn } from "@/shared/misc";
import React from "react";

interface MessageProps {
  children: React.ReactNode;
}

function MessageList({ children }: MessageProps) {
  const [scrollTop, setScrollTop] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [viewportHeight, setViewportHeight] = React.useState(0);
  // const messageEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!containerRef.current) return;
    setViewportHeight(containerRef.current.clientHeight);

    const observer = new ResizeObserver((entries) => {
      console.log("resize", entries[0].contentRect.height);
      setViewportHeight(entries[0].contentRect.height);
    });

    observer.observe(containerRef.current);
    console.log(scrollTop);
    console.log(viewportHeight);
    return () => observer.disconnect();
  }, [scrollTop, viewportHeight]);

  // React.useEffect(() => {
  //   if (!messageEndRef.current) return;
  //   messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  // }, [children]);

  function handleScroll(e: React.UIEvent<HTMLDivElement>) {
    console.log("scroll", e.currentTarget.scrollTop);
    setScrollTop(e.currentTarget.scrollTop);
  }

  return (
    <div
      id="message-container"
      className={cn(
        "message-container",
        "mt-4 flex h-full items-end overflow-y-scroll",
      )}
      ref={containerRef}
      onScroll={handleScroll}
    >
      <div className="h-full w-full px-3 py-4">
        <div className="flex flex-col space-y-4">{children}</div>
      </div>
    </div>
  );
}
export { MessageList };
