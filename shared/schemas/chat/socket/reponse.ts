import { z } from "zod";
import { nicknameSchema, messageSchema } from "../../shared";

export const messageResponseSchema = z.object({
  sender: nicknameSchema,
  message: messageSchema,
});
