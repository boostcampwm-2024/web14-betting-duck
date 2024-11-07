import { z } from "zod";
import { STATUS_CODE, STATUS_MESSAGE } from "../../vars/status";
import { USER_ROLE } from "../../vars/user";

export const StatusCodeSchema = z.enum(STATUS_CODE);
export const StatusMessageSchema = z.enum(STATUS_MESSAGE);

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
