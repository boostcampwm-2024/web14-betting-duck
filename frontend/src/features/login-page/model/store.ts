import { GuestLoginRequest, LoginRequest, SignupRequest } from "./types";
import { guestlogin, login, signup } from "./api";
import { useState } from "react";

function useAuthStore() {
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (data: LoginRequest) => {
    setError(null);
    try {
      const response = await login(data);
      return { success: true, data: response };
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        return { success: false, error: err.message };
      }
    }
    return { success: false, error: "알 수 없는 오류가 발생했습니다." };
  };

  const handleSignup = async (data: SignupRequest) => {
    setError(null);
    try {
      const response = await signup(data);
      return { success: true, data: response };
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        return { success: false, error: err.message };
      }
    }
    return { success: false, error: "알 수 없는 오류가 발생했습니다." };
  };

  const handleGuestLogin = async (data: GuestLoginRequest) => {
    setError(null);
    try {
      const response = await guestlogin(data);
      return { success: true, data: response };
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        return { success: false, error: err.message };
      }
    }
    return { success: false, error: "알 수 없는 오류가 발생했습니다." };
  };

  return { error, handleLogin, handleSignup, handleGuestLogin };
}

export { useAuthStore };
