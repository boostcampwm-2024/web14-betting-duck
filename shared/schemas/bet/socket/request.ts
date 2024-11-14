import { z } from 'zod';

export const joinRoomRequestSchema = z.object({
  sender: z.object({
    nickname: z.string().min(1, '닉네임이 필요합니다.'),
    role: z.enum(['user', 'admin', 'moderator']),
  }),
  channel: z.object({
    roomId: z.string().min(1, 'Room ID가 필요합니다.'),
  }),
});

export type joinRoomRequest = z.infer<typeof joinRoomRequestSchema>;