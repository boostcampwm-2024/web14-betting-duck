import { checkAuthStatus } from "./guard";
import { QueryClient, EnsureQueryDataOptions } from "@tanstack/react-query";

const authQueries: EnsureQueryDataOptions = {
  queryKey: ["auth"],
  queryFn: checkAuthStatus,
  staleTime: 5 * 60 * 1000,
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
