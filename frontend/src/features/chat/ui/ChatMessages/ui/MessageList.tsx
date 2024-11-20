// import { useChat } from "@/features/chat/hook/use-chat";
import { cn } from "@/shared/misc";
import React from "react";
// import { useEffectOnce } from "@/shared/hooks/use-effect-once";

interface MessageProps {
  children: React.ReactNode;
}

function MessageList({ children }: MessageProps) {
  // // const { socket } = useChat();
  // const containerRef = React.useRef<HTMLDivElement>(null);
  // const messageEndRef = React.useRef<HTMLDivElement>(null);
  // // const scrollTopRef = React.useRef<HTMLDivElement>(null);
  // // const [messageHeights, setMessageHeights] = React.useState(
  // //   new Map<string, number>(),
  // // );
  // const heightObserverRef = React.useRef<ResizeObserver | null>(null);

  // const scrollTopObserver = React.useRef<IntersectionObserver | null>(null);
  // const scrollBottomObserver = React.useRef<IntersectionObserver | null>(null);

  // const [startIndex, setStartIndex] = React.useState(0);
  // const [endIndex, setEndIndex] = React.useState(0);
  // const activeObservers = React.useRef({
  //   top: new Set<Element>(),
  //   bottom: new Set<Element>(),
  // });

  // // 스크롤 상태 관리
  // const [isScrolling, setIsScrolling] = React.useState(false);
  // const scrollingTimer = React.useRef<number | null>(null);
  // const SCROLL_TIMEOUT = 150; // 스크롤이 멈췄다고 판단할 시간 (ms)

  // const handleScroll = React.useCallback(() => {
  //   if (!isScrolling) {
  //     console.log("Scrolling...");
  //     setIsScrolling(true);
  //   }

  //   if (scrollingTimer.current) {
  //     window.clearTimeout(scrollingTimer.current);
  //   }

  //   scrollingTimer.current = window.setTimeout(() => {
  //     setIsScrolling(false);
  //     scrollingTimer.current = null;
  //   }, SCROLL_TIMEOUT);
  // }, [isScrolling]);

  // // ResizeObserver 설정
  // React.useEffect(() => {
  //   heightObserverRef.current = new ResizeObserver((entries) => {
  //     entries.forEach((entry) => {
  //       const messageId = entry.target.getAttribute("data-message-id");
  //       if (messageId) {
  //         setMessageHeights((prev) => {
  //           const newHeights = new Map(prev);
  //           newHeights.set(messageId, entry.contentRect.height);
  //           return newHeights;
  //         });
  //       }
  //     });
  //   });

  //   return () => {
  //     heightObserverRef.current?.disconnect();
  //   };
  // }, []);

  // // IntersectionObserver 설정
  // React.useEffect(() => {
  //   const scrollTopElement = document.getElementById(
  //     "message-container-scroll-top",
  //   );
  //   if (!scrollTopElement) return;

  //   scrollTopObserver.current = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         const messageId = entry.target.getAttribute("data-message-id");
  //         // getBoundingClientRect()를 사용하여 scrollTopElement와의 실제 겹침 여부 확인
  //         const scrollTopRect = scrollTopElement.getBoundingClientRect();
  //         const messageRect = entry.target.getBoundingClientRect();

  //         const isOverlapping = !(
  //           scrollTopRect.right < messageRect.left ||
  //           scrollTopRect.left > messageRect.right ||
  //           scrollTopRect.bottom < messageRect.top ||
  //           scrollTopRect.top > messageRect.bottom
  //         );

  //         if (isOverlapping && messageId) {
  //           console.log("Overlapping message:", messageId);
  //         }
  //       });
  //     },
  //     {
  //       root: scrollTopElement,
  //       // rootMargin을 늘려서 감지 영역을 확장
  //       rootMargin: "20px 0px 20px 0px",
  //       threshold: [0, 0.1, 0.5, 1],
  //     },
  //   );

  //   // sentinel 요소들 관찰 시작
  //   const sentinels = document.querySelectorAll(".sentinel");
  //   sentinels.forEach((sentinel) => {
  //     scrollTopObserver.current?.observe(sentinel);
  //   });

  //   return () => {
  //     scrollTopObserver.current?.disconnect();
  //   };
  // }, [children, isScrolling]);

  // // 스크롤의 바닥에 있는 컴포넌트의 인덱스를 IntersectionObserver로 계산
  // React.useEffect(() => {
  //   const bottomElement = document.getElementById(
  //     "message-container-scroll-bottom",
  //   );
  //   if (!bottomElement) return;

  //   scrollBottomObserver.current = new IntersectionObserver(
  //     (entries) => {
  //       const messageId = entries[0].target.getAttribute("data-message-id");
  //       console.log("Bottom element:", messageId);
  //       const scrollBottomRect = bottomElement.getBoundingClientRect();
  //       const messageRect = entries[0].target.getBoundingClientRect();

  //       const isOverlapping = !(
  //         scrollBottomRect.right < messageRect.left ||
  //         scrollBottomRect.left > messageRect.right ||
  //         scrollBottomRect.bottom < messageRect.top ||
  //         scrollBottomRect.top > messageRect.bottom
  //       );

  //       if (isOverlapping && messageId) {
  //         console.log("Overlapping bottom message:", messageId);
  //       }
  //     },
  //     {
  //       root: bottomElement,
  //       rootMargin: "20px 0px 20px 0px",
  //       threshold: [0, 0.1, 0.5, 1],
  //     },
  //   );

  //   const sentinels = document.querySelectorAll(".sentinel");
  //   sentinels.forEach((sentinel) => {
  //     scrollBottomObserver.current?.observe(sentinel);
  //   });

  //   return () => {
  //     scrollBottomObserver.current?.disconnect();
  //   };
  // }, [children, isScrolling]);

  // // 메시지 측정
  // const measureMessage = React.useCallback(
  //   (element: HTMLElement | null, messageId: string) => {
  //     if (!element || !heightObserverRef.current) return;
  //     element.setAttribute("data-message-id", messageId);
  //     heightObserverRef.current.observe(element);
  //   },
  //   [],
  // );

  return (
    <div
      id="message-container"
      className={cn("message-container mt-4 overflow-y-scroll")}
    >
      <div className="relative w-full">
        <div className="absolute inset-x-0 px-3 py-4">
          <div className="flex flex-col space-y-4">
            {children}
            {/* {React.Children.toArray(children).map((child, index) => (
              <div
                key={`message-${index}`}
                ref={(el) => measureMessage(el, `message-${index}`)}
                className="sentinel"
                data-message-id={`message-${index}`}
              >
                {child}
              </div>
            ))}
            <div ref={messageEndRef} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export { MessageList };
