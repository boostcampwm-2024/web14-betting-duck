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

  React.useEffect(() => {
    const abortController = new AbortController();

    fetch("/api/users/token", { signal: abortController.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error("토큰이 존재하지 않습니다.");
        }
        return fetch("/api/users/userInfo", { signal: abortController.signal });
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "토큰을 이용하여 사용자 정보를 불러오는데 실패 했습니다.",
          );
        }
        return response.json();
      })
      .then((data) => {
        const { role, nickname, duck } = data.data as UserInfo;
        updateUserInfo({ role, nickname, duck });
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          return;
        }
        // 에러 발생 시 기본값으로 리셋
        updateUserInfo(defaultUserInfo);
        console.error("Failed to initialize user session:", error);
      });

    return () => {
      abortController.abort();
    };
  }, []);

  const updateUserInfo = ({ ...info }: UserInfo) => {
    console.log("updateUserInfo", info);
    setUserInfo((prev) => {
      return {
        ...prev,
        ...info,
      };
    });

    if (info.role === "guest") {
      sessionStorage.removeItem("userInfo");
    } else {
      sessionStorage.setItem("userInfo", JSON.stringify(info));
    }
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
