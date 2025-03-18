import { QueryClient } from "@tanstack/react-query";
import { authQueries } from "../lib/auth/authQuery";
import { z } from "zod";
import { AuthStatusTypeSchema } from "../lib/auth/guard";

type QueryData = z.infer<typeof AuthStatusTypeSchema>;

async function updateQueryClient(
  queryClient: QueryClient,
  queryKey: string[],
  callback: (prev: QueryData) => QueryData,
) {
  queryClient.setQueryData(authQueries.queryKey, callback);
  await queryClient.invalidateQueries({ queryKey });
}

export { updateQueryClient };
