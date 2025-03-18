import { z } from "zod";
import { nicknameSchema } from "../../shared";

const creatorSchema = z.object({
  id: z.number().int().positive(),
});

const optionSchema = z.object({
  name: z.string(),
});

const settingsSchema = z.object({
  defaultBetAmount: z.number().int().positive(),
  duration: z.number().int().positive(),
});

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

const channelSchema = z.object({
  id: z.string(),
  title: z.string(),
  creator: creatorSchema,
  options: z.object({
    option1: optionSchema,
    option2: optionSchema,
  }),
  status: z.enum(["waiting", "active", "timeover", "finished"]),
  settings: settingsSchema,
  metadata: z.object({
    createdAt: z.string().datetime(),
    startAt: z.string().datetime().nullable(),
    endAt: z.string().datetime().nullable(),
  }),
  urls: z.object({
    invite: z.string().url(),
  }),
  isAdmin: z.boolean(),
});

const summaryChannelSchema = z.object({
  title: z.string(),
  options: z.object({
    option1: optionSchema,
    option2: optionSchema,
  }),
  status: z.enum(["waiting", "active", "timeover", "finished"], {
    message: "status는 waiting, active, timeover, finished 중 하나여야 합니다.",
  }),
  settings: settingsSchema,
});

const summaryResponseSchema = z.object({
  status: z.number().int().positive(),
  data: z.object({
    channel: channelSchema,
    message: z.string(),
  }),
});

const responseBetRoomInfo = z.object({
  channel: channelSchema,
  message: z.string(),
});

type responseFetchBetRoomInfoType = z.infer<
  typeof responseFetchBetRoomInfoSchema
>;

type summaryResponseType = z.infer<typeof summaryResponseSchema>;

export {
  channelSchema,
  responseFetchBetRoomInfoSchema,
  responseBetRoomInfo,
  summaryChannelSchema,
  summaryResponseSchema,
  type responseFetchBetRoomInfoType,
  type summaryResponseType,
};
