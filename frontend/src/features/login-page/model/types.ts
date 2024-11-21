export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  nickname: string;
  password: string;
}

export interface GuestLoginRequest {
  nickname: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  nickname: string;
  password: string;
}

export interface GuestLoginRequest {
  nickname: string;
}

export interface LoginResponse {
  status: number;
  data: {
    message: string;
    accessToken: string;
    nickname: string;
    role: string;
  };
}
