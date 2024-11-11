import { z } from "zod";
import { selectedOption } from "../../vars/selectedoption";

export const betRequestSchema = z.object({
	bet_room_id: z.string(),
	bet_amount: z.number().int().positive("배팅 금액은 양수여야 합니다."),
	selected_option: z.enum(selectedOption),
});
