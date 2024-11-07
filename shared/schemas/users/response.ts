import { z } from "zod";
import { USER_ROLE } from "../../vars/user";
import { StatusCodeSchema, StatusMessageSchema } from "../../vars/status";

const commonUserSchema = z.object({
	status: StatusCodeSchema,
	data: z.object({
		message: StatusMessageSchema,
	}),
});

export const responseSignupSchema = commonUserSchema;

export const responseLoginSchema = commonUserSchema.extend({
	data: z.object({
		role: z.enum(USER_ROLE),
		nickname: z.string().min(2, "닉네임은 2자 이상이어야 합니다."),
	}),
});

export const responseGuestLoginSchema = responseLoginSchema;

export const responseUsersSchema = commonUserSchema.extend({
	nickename: z.string().min(2, "닉네임은 2자 이상이어야 합니다."),
	duck: z.number(),
});

export const rejectResponseSchema = commonUserSchema;
