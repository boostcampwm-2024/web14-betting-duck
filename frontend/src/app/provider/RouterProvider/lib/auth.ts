import { atom } from "recoil";

export type AuthState = {
  isAuthenticated: boolean;
  nickname?: string;
  isLoading: boolean;
  roomId?: string;
};

export const Auth = atom<AuthState>({
  key: "auth",
  default: {
    isAuthenticated: false,
    isLoading: true,
    nickname: undefined,
    roomId: undefined,
  },
});
