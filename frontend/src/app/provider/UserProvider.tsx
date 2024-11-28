import { useSessionStorage } from "@/shared/hooks/useSessionStorage";
import React from "react";

interface UserContextType {
  userInfo: UserInfo;
  setUserInfo: (info: UserInfo) => Promise<void>;
  refreshUserInfo: () => Promise<void>;
}

interface UserInfo {
  nickname?: string;
  role?: "user" | "guest" | "admin" | "member";
  roomId?: string;
  isPlaceBet?: boolean;
  placeBetAmount?: number;
}

const defaultUserInfo: UserInfo = {
  nickname: "",
  role: "guest",
  roomId: undefined,
  isPlaceBet: false,
  placeBetAmount: 0,
};

const UserContext = React.createContext<UserContextType | null>(null);

function UserProvider({ children }: { children: React.ReactNode }) {
  const { getSessionItem, setSessionItem } = useSessionStorage();
  const [userInfo, setUserInfo] = React.useState<UserInfo>(defaultUserInfo);
  const initialized = React.useRef(false);

  React.useEffect(() => {
    const loadInitialState = async () => {
      if (initialized.current) return;

      try {
        const savedUserInfo = await getSessionItem("userInfo");
        if (savedUserInfo) {
          setUserInfo(JSON.parse(savedUserInfo));
        }
      } catch (error) {
        console.error(error);
        throw new Error("사용자의 초기 정보를 불러오는데 실패 했습니다.");
      } finally {
        initialized.current = true;
      }
    };

    loadInitialState();
  }, [getSessionItem]);

  const updateUserInfo = React.useCallback(
    async (info: Partial<UserInfo>) => {
      try {
        const newUserInfo = {
          ...userInfo,
          ...info,
        };
        await setSessionItem("userInfo", JSON.stringify(newUserInfo));
        setUserInfo(newUserInfo);
      } catch (error) {
        console.error("사용자의 정보를 업데이트에 실패 했습니다.", error);
        throw error;
      }
    },
    [setSessionItem, userInfo],
  );

  const refreshUserInfo = React.useCallback(async () => {
    try {
      const response = await fetch("/api/users/userInfo");
      if (!response.ok) {
        throw new Error("사용자 정보를 불러오는데 실패했습니다.");
      }
      const { data } = await response.json();
      const { role, nickname } = data as UserInfo;
      await updateUserInfo({ role, nickname });
    } catch (error) {
      updateUserInfo(defaultUserInfo);
      console.error("Failed to refresh user info:", error);
    }
  }, [updateUserInfo]);

  const value = React.useMemo(
    () => ({
      userInfo,
      setUserInfo: updateUserInfo,
      refreshUserInfo,
    }),
    [userInfo, refreshUserInfo, updateUserInfo],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export { UserProvider, UserContext, type UserInfo };
