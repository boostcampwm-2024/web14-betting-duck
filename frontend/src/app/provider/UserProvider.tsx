import { useSessionStorage } from "@/shared/hooks/use-session-storage";
import React from "react";

interface UserContextType {
  userInfo: UserInfo;
  setUserInfo: (info: UserInfo) => void;
  refreshUserInfo: () => Promise<void>;
}

interface UserInfo {
  nickname?: string;
  duck?: number;
  role?: "user" | "guest" | "admin" | "member";
  roomId?: string;
}

const defaultUserInfo: UserInfo = {
  nickname: "",
  duck: 0,
  role: "guest",
  roomId: undefined,
};

const UserContext = React.createContext<UserContextType | null>(null);

function UserProvider({ children }: { children: React.ReactNode }) {
  const { getSessionItem, setSessionItem } = useSessionStorage();
  const [userInfo, setUserInfo] = React.useState<UserInfo>(() => {
    const userInfo = getSessionItem("userInfo");
    if (userInfo) {
      return JSON.parse(userInfo);
    }
    return defaultUserInfo;
  });

  const updateUserInfo = React.useCallback(
    (info: Partial<UserInfo>) => {
      setUserInfo((prev) => {
        const newUserInfo = {
          ...prev,
          ...info,
        };
        setSessionItem("userInfo", JSON.stringify(newUserInfo));
        return newUserInfo;
      });
    },
    [setSessionItem],
  );

  const refreshUserInfo = React.useCallback(async () => {
    try {
      const response = await fetch("/api/users/userInfo");
      if (!response.ok) {
        throw new Error("사용자 정보를 불러오는데 실패했습니다.");
      }
      const { data } = await response.json();
      const { role, nickname, duck } = data as UserInfo;
      updateUserInfo({ role, nickname, duck });
    } catch (error) {
      updateUserInfo(defaultUserInfo);
      console.error("Failed to refresh user info:", error);
    }
  }, [updateUserInfo]);

  const getSessionUserInfo = React.useCallback(() => {
    const userInfo = getSessionItem("userInfo");
    return userInfo;
  }, [getSessionItem]);

  const value = React.useMemo(
    () => ({
      userInfo: getSessionUserInfo() || userInfo,
      setUserInfo: updateUserInfo,
      refreshUserInfo,
    }),
    [userInfo, refreshUserInfo, getSessionUserInfo, updateUserInfo],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export { UserProvider, UserContext, type UserInfo };
