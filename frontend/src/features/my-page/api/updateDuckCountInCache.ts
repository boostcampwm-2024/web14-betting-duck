import { z } from "zod";
import { authQueries } from "@/shared/lib/auth/authQuery";
import { AuthStatusTypeSchema } from "@/shared/lib/auth/guard";
import { useQueryClient } from "@tanstack/react-query";

async function updateDuckCountInCache(
  queryClient: ReturnType<typeof useQueryClient>,
  {
    currentDuck,
    numberOfDucks,
  }: { currentDuck: number; numberOfDucks: number },
) {
  await queryClient.setQueryData(
    authQueries.queryKey,
    (old: z.infer<typeof AuthStatusTypeSchema>) => ({
      ...old,
      userInfo: {
        ...old.userInfo,
        duck: currentDuck - 30,
        realDuck: numberOfDucks + 1,
      },
    }),
  );
}

export { updateDuckCountInCache };
