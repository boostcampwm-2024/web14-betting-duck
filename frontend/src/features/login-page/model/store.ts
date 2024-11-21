import { GuestLoginRequest, LoginRequest, SignupRequest } from "./types";
import { guestlogin, login, signup } from "./api";

function useAuthStore() {
  const handleLogin = async (data: LoginRequest) => {
    try {
      const response = await login(data);
      console.log(response);
    } catch (err) {
      console.error("로그인 실패", err);
    }
  };

  const handleSignup = async (data: SignupRequest) => {
    try {
      const response = await signup(data);
      console.log(response);
    } catch (err) {
      console.error("회원가입 실패", err);
    }
  };

  const handleGuestLogin = async (data: GuestLoginRequest) => {
    try {
      const response = await guestlogin(data);
      console.log(response);
    } catch (err) {
      console.error("비회원 로그인 실패", err);
    }
  };

  return { handleLogin, handleSignup, handleGuestLogin };
}

export { useAuthStore };
