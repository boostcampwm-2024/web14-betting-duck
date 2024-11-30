import { z } from "zod";
import { responseUserInfoSchema } from "@betting-duck/shared";

type UserInfo = z.infer<typeof responseUserInfoSchema>;

type RootLoaderData = {
  userInfo: UserInfo;
};

export type { UserInfo, RootLoaderData };
