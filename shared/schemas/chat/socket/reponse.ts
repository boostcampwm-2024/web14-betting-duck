import { z } from "zod";
import { senderSchema, messageSchema } from "../../shared";

export const messageResponseSchema = z.object({
  sender: senderSchema,
  message: messageSchema,
});
