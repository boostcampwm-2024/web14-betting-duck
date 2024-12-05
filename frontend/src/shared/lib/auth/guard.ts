import { responseUserInfoSchema } from "@betting-duck/shared";
import { redirect } from "@tanstack/react-router";
import { z } from "zod";

export async function requireAuth({ to }: { to: string }) {
  try {
    const [tokenResponse, userInfoResponse] = await Promise.all([
      fetch("/api/users/token", { credentials: "include" }),
      fetch("/api/users/userInfo", { credentials: "include" }),
    ]);

    if (!tokenResponse.ok) {
      throw redirect({
        to: "/require-login",
        search: { from: encodeURIComponent(to) },
      });
    }

    if (!userInfoResponse.ok) {
      throw new Error("사용자 정보를 불러오는데 실패했습니다.");
    }

    const { data } = await userInfoResponse.json();
    const userInfo = responseUserInfoSchema.safeParse(data);

    if (!userInfo.success) {
      throw new Error("사용자 정보를 파싱하는데 실패했습니다.");
    }

    return userInfo.data;
  } catch (error) {
    console.error(error);
    throw redirect({
      to: "/require-login",
      search: { from: encodeURIComponent(to) },
    });
  }
}

export async function requireUesrRole({
  userInfo,
  to,
  role,
}: {
  userInfo: z.infer<typeof responseUserInfoSchema>;
  to: string;
  role: "user" | "admin" | "guest";
}) {
  if (role === "guest") {
    throw redirect({
      to: "/require-login",
      search: { from: encodeURIComponent(to) },
    });
  }

  return userInfo;
}

export type UserInfoType = z.infer<typeof responseUserInfoSchema>;

type AuthStatusType = {
  isAuthenticated: boolean;
  userInfo: UserInfoType;
};

const defaultUserInfo: UserInfoType = {
  message: "OK",
  role: "user",
  nickname: "",
  duck: 0,
  realDuck: 0,
};

export const AuthStatusTypeSchema = z.object({
  isAuthenticated: z.boolean(),
  userInfo: responseUserInfoSchema,
});

export async function checkAuthStatus(): Promise<AuthStatusType> {
  try {
    const [tokenResponse, userInfoResponse] = await Promise.all([
      fetch("/api/users/token", {
        headers: {
          "Cache-Control": "stale-while-revalidate",
          Pragma: "no-cache",
        },
        credentials: "include",
      }),
      fetch("/api/users/userInfo", {
        credentials: "include",
      }),
    ]);

    if (!tokenResponse.ok || !userInfoResponse.ok) {
      return {
        isAuthenticated: false,
        userInfo: defaultUserInfo,
      };
    }

    const { data } = await userInfoResponse.json();
    const result = responseUserInfoSchema.safeParse(data);

    if (!result.success) {
      return {
        isAuthenticated: false,
        userInfo: defaultUserInfo,
      };
    }

    return {
      isAuthenticated: true,
      userInfo: result.data,
    };
  } catch {
    return {
      isAuthenticated: false,
      userInfo: defaultUserInfo,
    };
  }
}
