import { z } from "zod";

const passwordStrength = (password: string) => {
  const hasNumber = /\d/.test(password);
  const hasLower = /[a-z]/.test(password);

  return hasNumber && hasLower;
};

const userCommonSchema = z.object({
  nickname: z.string().min(1, "닉네임은 1자 이상이어야 합니다."),
  password: z
    .string()
    .refine(
      passwordStrength,
      "비밀번호는 영문 소문자, 숫자를 포함해야 합니다.",
    ),
});

export const requestSignUpSchema = userCommonSchema.extend({
  email: z
    .string()
    .email("이메일 형식이여야 합니다.")
    .min(6, "이메일은 6자 이상이어야 합니다."),
});

export const requestSignInSchema = z.object({
  email: z
    .string()
    .email("이메일 형식이여야 합니다.")
    .min(6, "이메일은 6자 이상이어야 합니다."),
  password: z.string().min(1, "비밀번호는 1자 이상이어야 합니다."),
});

export const requestGuestSignInSchema = z.object({
  nickname: z.string().min(1, "닉네임은 1자 이상이어야 합니다."),
});

export const requestGuestLoginActivitySchema = z.object({});

export const requestUpgradeGuest = requestSignUpSchema;
