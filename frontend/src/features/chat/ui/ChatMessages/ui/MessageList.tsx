import { cn } from "@/shared/misc";
import React from "react";

interface MessageProps {
  children: React.ReactNode;
}

function MessageList({ children }: MessageProps) {
  const [scrollTop, setScrollTop] = React.useState(0);
  const [messageHeights, setMessageHeights] = React.useState(
    new Map<string, number>(),
  );

  const [totalHeight, setTotalHeight] = React.useState(0);
  const [averageMessageHeight, setAverageMessageHeight] = React.useState(0);

  const [isScrolling, setIsScrolling] = React.useState(false);

  const heightObserverRef = React.useRef<ResizeObserver | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const messageEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (messageHeights.size === 0) return;
    const total = Array.from(messageHeights.values()).reduce(
      (acc, curr) => acc + curr,
      0,
    );
    setAverageMessageHeight(total / messageHeights.size);
    setTotalHeight(total);
  }, [messageHeights]);

  const handleScroll = React.useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      if (!isScrolling && e.currentTarget) {
        const scrollTop = e.currentTarget.scrollTop;
        window.requestAnimationFrame(() => {
          setScrollTop(scrollTop);
          setIsScrolling(true);
        });
      }

      const scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
      return () => clearTimeout(scrollTimeout);
    },
    [isScrolling],
  );
  // function handleScroll(e: React.UIEvent<HTMLDivElement>) {
  //   console.log("scroll", e.currentTarget.scrollTop);
  //   setScrollTop(e.currentTarget.scrollTop);
  // }

  React.useEffect(() => {
    const shouldAutoScroll = () => {
      if (!containerRef.current) return false;
      const { scrollHeight, scrollTop, clientHeight } = containerRef.current;

      return scrollHeight - (scrollTop + clientHeight) < 100;
    };

    if (!messageEndRef.current || !shouldAutoScroll()) return;
    messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [children]);

  React.useEffect(() => {
    heightObserverRef.current = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const { target } = entry;
        const messageId = target.getAttribute("data-message-id");
        if (messageId) {
          setMessageHeights((prev) =>
            new Map(prev).set(messageId, entry.contentRect.height),
          );
        }
      });
    });
  }, []);

  const messageCache = React.useRef(new Map<string, number>());

  const measureMessage = React.useCallback(
    (element: HTMLElement | null, messageId: string) => {
      if (!element || !heightObserverRef.current) return;

      const cachedHeight = messageCache.current.get(messageId);
      if (cachedHeight) {
        setMessageHeights((prev) => new Map(prev).set(messageId, cachedHeight));
        return;
      }

      element.setAttribute("data-message-id", messageId);
      heightObserverRef.current.observe(element);
    },
    [],
  );

  const calculateVisibleRange = React.useCallback(() => {
    if (!containerRef.current) return { startIndex: 0, endIndex: 10 };

    const scrollPosition = scrollTop;
    const viewportHeight = containerRef.current.clientHeight;
    const buffer = Math.ceil(viewportHeight / (averageMessageHeight || 1)) * 2;

    return {
      startIndex: Math.max(
        0,
        Math.floor(scrollPosition / (averageMessageHeight || 1)) - buffer,
      ),
      endIndex: Math.min(
        React.Children.count(children),
        Math.ceil(
          (scrollPosition + viewportHeight) / (averageMessageHeight || 1),
        ) + buffer,
      ),
    };
  }, [scrollTop, averageMessageHeight, children]);

  const { startIndex, endIndex } = React.useMemo(
    () => calculateVisibleRange(),
    [calculateVisibleRange],
  );

  console.log("startIndex", startIndex);
  console.log("endIndex", endIndex);
  console.log("averageMessageHeight", averageMessageHeight);
  console.log("averageMessageHeight", startIndex * averageMessageHeight);
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
      <div
        className="relative h-full w-full px-3 py-4"
        style={{ height: totalHeight }}
      >
        <div
          style={{
            position: "absolute",
            top: startIndex * averageMessageHeight,
            left: 0,
            right: 0,
          }}
          className="flex flex-col space-y-4"
        >
          {React.Children.toArray(children)
            .slice(startIndex, endIndex)
            .map((child, index) => (
              <div
                key={`message-${index}`}
                ref={(el) => measureMessage(el, `message-${index}`)}
              >
                {child}
              </div>
            ))}
          <div ref={messageEndRef} />
        </div>
      </div>
    </div>
  );
}
export { MessageList };
