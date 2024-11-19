import React from "react";

function MessageList({ children }: { children: React.ReactNode }) {
  const messageEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!messageEndRef.current) return;
    messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [children]);

  return (
    <div className="bg-layout-main h-full max-h-[600px] min-h-[600px] overflow-y-scroll px-3 py-4">
      <div className="flex flex-col space-y-4">{children}</div>
      <div ref={messageEndRef} />
    </div>
  );
}

export { MessageList };
