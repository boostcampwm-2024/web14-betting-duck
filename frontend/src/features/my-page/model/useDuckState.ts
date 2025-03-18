import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { AuthStatusTypeSchema } from "@/shared/lib/auth/guard";
import { useCallback } from "react";
import { authQueries } from "@/shared/lib/auth/authQuery";

type AuthStatusType = z.infer<typeof AuthStatusTypeSchema>;

function useDuckState(authData: AuthStatusType) {
  const queryClient = useQueryClient();

  const currentDuck = authData.userInfo.duck;
  const numberOfDucks = authData.userInfo.realDuck;

  const addDuck = useCallback(() => {
    queryClient.setQueryData(authQueries.queryKey, (old: AuthStatusType) => ({
      ...old,
      userInfo: {
        ...old.userInfo,
        duck: old.userInfo.duck - 30,
        realDuck: old.userInfo.realDuck + 1,
      },
    }));
  }, [queryClient]);

  return {
    currentDuck,
    numberOfDucks,
    addDuck,
  };
}

export { useDuckState };
