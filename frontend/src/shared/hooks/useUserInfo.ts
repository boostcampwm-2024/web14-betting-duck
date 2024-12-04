import { EnsureQueryDataOptions, useQuery } from "@tanstack/react-query";
import { responseUserInfo } from "../api/responseUserInfo";
import { z } from "zod";
import { responseUserInfoSchema } from "@betting-duck/shared";
import { UserInfo } from "../types";

const USER_INFO_QUERY_KEY = ["userInfo"] as const;
type USER_INFO_QUERY_KEY = typeof USER_INFO_QUERY_KEY;

const userInfoQueries: EnsureQueryDataOptions<
  UserInfo,
  Error,
  UserInfo,
  USER_INFO_QUERY_KEY
> = {
  queryKey: USER_INFO_QUERY_KEY,
  queryFn: async (): Promise<z.infer<typeof responseUserInfoSchema>> => {
    const userInfo = await responseUserInfo();
    return userInfo;
  },
};

function useUserInfo() {
  return useQuery({
    queryKey: userInfoQueries.queryKey,
    queryFn: userInfoQueries.queryFn,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}

export { userInfoQueries, useUserInfo, USER_INFO_QUERY_KEY };
