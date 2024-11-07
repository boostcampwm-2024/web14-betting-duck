import { z } from "zod";
import { StatusCodeSchema, StatusMessageSchema } from "../../vars/status";

export const rejectResponseSchema = z.object({
	status: StatusCodeSchema,
	data: z.object({
		message: StatusMessageSchema,
	}),
});
