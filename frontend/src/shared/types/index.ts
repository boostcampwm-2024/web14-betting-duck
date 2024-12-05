import { z } from "zod";
import {
  responseBetRoomInfo,
  responseUserInfoSchema,
} from "@betting-duck/shared";

type UserInfo = z.infer<typeof responseUserInfoSchema>;

type RootLoaderData = {
  userInfo: UserInfo;
};

const BettingRoomInfoSchema = responseBetRoomInfo.extend({
  isPlaceBet: z.boolean(),
  placeBetAmount: z.number(),
});
type BettingRoomInfo = z.infer<typeof BettingRoomInfoSchema>;

export {
  type UserInfo,
  type RootLoaderData,
  type BettingRoomInfo,
  BettingRoomInfoSchema,
};
