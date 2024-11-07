import { z } from "zod";
import { StatusCodeSchema, StatusMessageSchema } from "../../vars/status";

const validateUrl = (url: string) => {
	const urlRegex = /^(http|https):\/\/[^ "]+$/;
	return urlRegex.test(url);
};

const responseCommonSchema = z.object({
	status: StatusCodeSchema,
	data: z.object({
		message: StatusMessageSchema,
	}),
});

const betroomsCommonSchema = responseCommonSchema.extend({
	data: z.object({
		title: z.string().min(2, "방 제목은 2자 이상이어야 합니다."),
		url: z.string().refine(validateUrl, "URL 형식이 올바르지 않습니다."),
	}),
});

export const responseBetroomSchema = betroomsCommonSchema.extend({
	data: z.object({
		bet_room_id: z.string(),
	}),
});
