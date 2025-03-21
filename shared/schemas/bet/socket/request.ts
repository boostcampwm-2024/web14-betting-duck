import { z } from "zod";
import { roomIdSchema } from "../../shared";

export const fetchBetRoomInfoRequestSchema = roomIdSchema;

export type fetchBetRoomInfoRequestType = z.infer<
  typeof fetchBetRoomInfoRequestSchema
>;

export const joinBetRoomRequestSchema = z.object({
  sender: z.object({
    betAmount: z.number().min(0, "베팅 금액은 0 이상이어야 합니다."),
    selectOption: z.enum(["option1", "option2"], {
      message: "선택 옵션은 1 또는 2이어야 합니다.",
    }),
  }),
  channel: roomIdSchema,
});

export type joinBetRoomRequestType = z.infer<typeof joinBetRoomRequestSchema>;
