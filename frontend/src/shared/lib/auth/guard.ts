import { responseUserInfoSchema } from "@betting-duck/shared";
import { z } from "zod";

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
  const tokenResponse = await fetch("/api/users/token", {
    headers: {
      "Cache-Control": "stale-while-revalidate",
      Pragma: "no-cache",
    },
    credentials: "include",
  });

  if (!tokenResponse.ok) {
    return {
      isAuthenticated: false,
      userInfo: defaultUserInfo,
    };
  }

  const userInfoResponse = await fetch("/api/users/userInfo", {
    headers: {
      "Cache-Control": "stale-while-revalidate",
      Pragma: "no-cache",
    },
    credentials: "include",
  });

  if (!userInfoResponse.ok) {
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
}

export async function getUserInfo() {
  const userInfoResponse = await fetch("/api/users/userInfo", {
    headers: {
      "Cache-Control": "stale-while-revalidate",
      Pragma: "no-cache",
    },
    credentials: "include",
  });

  if (!userInfoResponse.ok) {
    return defaultUserInfo;
  }

  const { data } = await userInfoResponse.json();
  const result = responseUserInfoSchema.safeParse(data);

  if (!result.success) {
    return defaultUserInfo;
  }

  return result.data;
}
