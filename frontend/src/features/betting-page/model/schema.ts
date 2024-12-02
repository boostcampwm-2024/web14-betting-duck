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

const userBettingStatusSchema = z.object({
  betAmount: z.coerce.number().int().min(0),
  selectedOption: z.union([
    z.literal("option1"),
    z.literal("option2"),
    z.literal("none"),
  ]),
});

export { bettingRoomSchema, userBettingStatusSchema };
