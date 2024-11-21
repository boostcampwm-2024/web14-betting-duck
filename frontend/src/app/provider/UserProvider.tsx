import React from "react";

interface UserContextType {
  nickname: string;
  coin: number;
  setNickName: (nickname: string) => void;
  setCoin: (coin: number) => void;
}

const UserContext = React.createContext<UserContextType | null>(null);

function UserProvider({ children }: { children: React.ReactNode }) {
  const [nickname, setNickName] = React.useState(
    () => sessionStorage.getItem("nickname") || "",
  );
  const [coin, setCoin] = React.useState(
    () => Number(sessionStorage.getItem("coin")) || 0,
  );

  const updateNickNameToSession = (nickname: string) => {
    sessionStorage.setItem("nickname", nickname);
    setNickName(nickname);
  };

  const updateCoinToSession = (coin: number) => {
    sessionStorage.setItem("coin", String(coin));
    setCoin(coin);
  };

  const value = React.useMemo(
    () => ({
      nickname,
      coin,
      setNickName: updateNickNameToSession,
      setCoin: updateCoinToSession,
    }),
    [nickname, coin],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export { UserProvider, UserContext };
