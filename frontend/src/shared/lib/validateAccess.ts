import { AccessError } from "@/features/waiting-room/error/AccessError";

async function validateAccess(roomId: string, signal: AbortSignal) {
  try {
    const [tokenResponse, roomResponse] = await Promise.all([
      fetch("/api/users/token", { signal }),
      fetch(`/api/betrooms/${roomId}`, { signal }),
    ]);

    if (!tokenResponse.ok) {
      throw AccessError.unauthorized("토큰이 존재하지 않습니다.", {
        requiredRole: "user",
      });
    }
    if (!roomResponse.ok) {
      throw AccessError.forbidden("방에 접근할 수 없습니다.", {
        roomId,
      });
    }
  } catch (error) {
    if (error instanceof AccessError) {
      throw error;
    }
    if ((error as Error).name === "AbortError") {
      throw new Error("요청이 취소되었습니다.");
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
}

export { validateAccess };
