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
  const [userInfo, setUserInfo] = React.useState<UserInfo>(() => {
    const userInfo = sessionStorage.getItem("userInfo");
    if (userInfo) {
      return JSON.parse(userInfo);
    }
    return defaultUserInfo;
  });

  const updateUserInfo = ({ ...info }: UserInfo) => {
    setUserInfo((prev) => {
      const newUserInfo = {
        ...prev,
        ...info,
      };
      sessionStorage.setItem("userInfo", JSON.stringify(newUserInfo));
      return newUserInfo;
    });
  };

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
  }, []);

  const value = React.useMemo(
    () => ({
      userInfo,
      setUserInfo: updateUserInfo,
      refreshUserInfo,
    }),
    [userInfo, refreshUserInfo],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export { UserProvider, UserContext, type UserInfo };
