import { z } from "zod";

const betroomsCommonSchema = z.object({
  channel: z.object({
    title: z.string().min(2, "방 제목은 2자 이상이어야 합니다."),
  }),
});

export const requestCreateBetroomSchema = betroomsCommonSchema.extend({
  options: z.object({
    option_1: z.string().min(2, "옵션 1은 2자 이상이어야 합니다."),
    option_2: z.string().min(2, "옵션 2은 2자 이상이어야 합니다."),
  }),
  settings: z.object({
    duration: z.number().int().positive("타이머는 양수여야 합니다."),
    defaultBetAmount: z.number().int().positive("타이머는 양수여야 합니다."),
  }),
});
