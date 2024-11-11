import { z } from "zod";
import { USER_ROLE } from "../../vars/user";

const passwordStrength = (password: string) => {
	const hasNumber = /\d/.test(password);
	const hasLower = /[a-z]/.test(password);

	return hasNumber && hasLower;
};

const userCommonSchema = z.object({
	email: z
		.string()
		.email("올바른 이메일 형식이 아닙니다.")
		.min(6, "이메일은 6자 이상이어야 합니다."),
	password: z
		.string()
		.refine(
			passwordStrength,
			"비밀번호는 영문 소문자, 숫자를 포함해야 합니다.",
		),
});

export const requestSignupSchema = userCommonSchema.extend({
	nickname: z.string().min(2, "닉네임은 2자 이상이어야 합니다."),
});

export const requestLoginSchema = userCommonSchema.extend({
	role: z.enum(USER_ROLE),
});

export const requestGuestLoginSchema = z.object({
	nickname: z.string().min(2, "닉네임은 2자 이상이어야 합니다."),
	role: z.enum(USER_ROLE),
});
