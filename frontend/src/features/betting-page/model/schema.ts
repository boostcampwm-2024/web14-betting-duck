import { z } from "zod";

const bettingRoomSchema = z.object({
  channel: z.object({
    creator: z.string(),
    status: z.enum(["waiting", "active", "timeover", "finished"]),
    option1: z.object({
      participants: z.coerce.number().int().lte(Number.MAX_SAFE_INTEGER),
      currentBets: z.coerce.number().int().lte(Number.MAX_SAFE_INTEGER),
    }),
    option2: z.object({
      participants: z.coerce.number().int().lte(Number.MAX_SAFE_INTEGER),
      currentBets: z.coerce.number().int().lte(Number.MAX_SAFE_INTEGER),
    }),
  }),
});

export { bettingRoomSchema };
