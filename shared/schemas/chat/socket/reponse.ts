import { z } from 'zod';
import { senderSchema, roomIdSchema, messageSchema } from '../../shared';

export const messageResponseSchema = z.object({
    sender: senderSchema,
    channel: roomIdSchema,
    message: messageSchema
});