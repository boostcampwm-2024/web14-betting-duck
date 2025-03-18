import { checkAuthStatus, getUserInfo } from "./guard";
import { QueryFunction } from "@tanstack/react-query";
import { AuthStatusTypeSchema } from "./guard";
import { z } from "zod";
import { responseUserInfoSchema } from "@betting-duck/shared";

const authQueries = {
  queryKey: ["auth"],
  queryFn: checkAuthStatus as QueryFunction<
    z.infer<typeof AuthStatusTypeSchema>
  >,
  gcTime: 1000 * 60 * 60 * 24,
  staleTime: 1000 * 60 * 60,
};

const userInfoQueries = {
  queryKey: ["auth", "userInfos"],
  queryFn: getUserInfo as QueryFunction<z.infer<typeof responseUserInfoSchema>>,
};

export { authQueries, userInfoQueries };
