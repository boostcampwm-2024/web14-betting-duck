import { checkAuthStatus } from "./guard";
import { QueryFunction } from "@tanstack/react-query";
import { AuthStatusTypeSchema } from "./guard";
import { z } from "zod";

const authQueries = {
  queryKey: ["auth"],
  queryFn: checkAuthStatus as QueryFunction<
    z.infer<typeof AuthStatusTypeSchema>
  >,
  gcTime: 1000 * 60 * 60 * 24,
  staleTime: 1000 * 60 * 60,
};

export { authQueries };
