import { GuestLoginRequest, LoginRequest, SignupRequest } from "./types";

export const login = async (data: LoginRequest) => {
  const response = await fetch("/api/users/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const signup = async (data: SignupRequest) => {
  const response = await fetch("/api/users/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const guestlogin = async (data: GuestLoginRequest) => {
  const response = await fetch("/api/users/guestsignin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};
