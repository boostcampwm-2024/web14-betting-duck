import React from "react";

const usePreventLeave = (enabled: boolean = true, roomId: string) => {
  const message =
    "배팅 페이지에서 벗어나면 배팅이 취소됩니다. 정말로 나가시겠습니까?";

  React.useEffect(() => {
    if (!enabled) return;

    const handleBeforeUnload = async (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = message;

      try {
        // 창이 닫히기 전 환불 요청 전송
        navigator.sendBeacon(
          `/api/betrooms/refund/${roomId}`,
          JSON.stringify({}),
        );
      } catch (error) {
        console.error("Failed to send refund request:", error);
      }

      return message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [enabled, message, roomId]);
};

export { usePreventLeave };
