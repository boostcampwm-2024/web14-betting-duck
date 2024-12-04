import { checkAuthStatus } from "./guard";
import { QueryClient, EnsureQueryDataOptions } from "@tanstack/react-query";

const authQueries: EnsureQueryDataOptions = {
  queryKey: ["auth"],
  queryFn: checkAuthStatus,
  gcTime: 1000 * 60 * 60 * 24,
  staleTime: 1000 * 60 * 60,
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export { authQueries, queryClient };
