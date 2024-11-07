import { z } from "zod";
import { selectedOption } from "../../vars/selectedoption";
import { StatusCodeSchema, StatusMessageSchema } from "../../vars/status";

export const betResultResponseSchema = z.object({
	status: StatusCodeSchema,
	data: z.object({
		option_1_total_bet: z
			.number()
			.int()
			.positive("옵션 1의 총 배팅 금액은 양수여야 합니다."),
		option_2_total_bet: z
			.number()
			.int()
			.positive("옵션 2의 총 배팅 금액은 양수여야 합니다."),
		option_1_total_participants: z
			.number()
			.int()
			.positive("옵션 1의 총 참여자 수는 양수여야 합니다."),
		option_2_total_participants: z
			.number()
			.int()
			.positive("옵션 2의 총 참여자 수는 양수여야 합니다."),
		winning_option: z.enum(selectedOption),
		message: StatusMessageSchema,
	}),
});
