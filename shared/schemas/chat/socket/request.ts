import { z } from 'zod';
import { senderSchema, roomIdSchema, messageSchema } from '../../shared';

export const sendMessageRequestSchema = z.object({
    sender: senderSchema,
    message: messageSchema,
    channel: roomIdSchema,
});

export type sendMessageRequestType = z.infer<typeof sendMessageRequestSchema>;