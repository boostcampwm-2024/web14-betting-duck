import { z } from "zod";
import { nicknameSchema, roomIdSchema, messageSchema } from "../../shared";

export const sendMessageRequestSchema = z.object({
  sender: nicknameSchema,
  message: messageSchema,
  channel: roomIdSchema,
});

export type sendMessageRequestType = z.infer<typeof sendMessageRequestSchema>;
