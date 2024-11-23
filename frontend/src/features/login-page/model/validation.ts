export const validateEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length >= 6;

export const validatePassword = (password: string): boolean =>
  /^(?=.*[a-z])(?=.*\d).{6,}$/.test(password);

export const validateNickname = (nickname: string): boolean =>
  nickname.trim().length >= 1;