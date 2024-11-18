import { z } from "zod";
import { nicknameSchema } from "../../shared";

const responseFetchBetRoomInfoSchema = z.object({
  channel: z.object({
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

type responseFetchBetRoomInfoType = z.infer<
  typeof responseFetchBetRoomInfoSchema
>;

export { responseFetchBetRoomInfoSchema, type responseFetchBetRoomInfoType };
