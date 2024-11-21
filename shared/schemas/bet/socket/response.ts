import { z } from "zod";
import { nicknameSchema } from "../../shared";

const responseFetchBetRoomInfoSchema = z.object({
  channel: z.object({
    id: z.string(),
    creator: nicknameSchema,
    status: z.enum(["waiting", "betting", "result"], {
      message: "status는 waiting, betting, result 중 하나여야 합니다.",
    }),
    option1: z.object({
      participants: z.number(),
      currentBets: z.number(),
    }),
    option2: z.object({
      participants: z.number(),
      currentBets: z.number(),
    }),
  }),
});

const creatorSchema = z.object({
  id: z.number().int().positive(),
});

const optionSchema = z.object({
  name: z.string(),
});

const channelSchema = z.object({
  id: z.string(),
  title: z.string(),
  creator: creatorSchema,
  options: z.object({
    option1: optionSchema,
    option2: optionSchema,
  }),
  status: z.enum(["waiting", "active", "timeover", "finished"]),
  settings: z.object({
    defaultBetAmount: z.number().int().positive(),
    duration: z.number().int().positive(),
  }),
  metadata: z.object({
    createdAt: z.string().datetime(),
    startAt: z.string().datetime().nullable(),
    endAt: z.string().datetime().nullable(),
  }),
  urls: z.object({
    invite: z.string().url(),
  }),
});

const responseBetRoomInfo = z.object({
  channel: channelSchema,
  message: z.string(),
});

type responseFetchBetRoomInfoType = z.infer<
  typeof responseFetchBetRoomInfoSchema
>;

export {
  responseFetchBetRoomInfoSchema,
  responseBetRoomInfo,
  type responseFetchBetRoomInfoType,
};
