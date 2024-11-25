export const Auth: Auth = {
  status: "unauthorized",
  nickname: undefined,
  roomId: undefined,
  login(nickname: string) {
    this.status = "forbidden";
    this.nickname = nickname;
  },
  logout() {
    this.status = "unauthorized";
    this.nickname = undefined;
  },
  joinRoom(roomId: string) {
    this.status = "logged_in";
    this.roomId = roomId;
  },
};

export type Auth = {
  login: (nickname: string) => void;
  logout: () => void;
  joinRoom: (roomId: string) => void;
  status: "logged_in" | "unauthorized" | "forbidden";
  nickname?: string;
  roomId?: string;
};
