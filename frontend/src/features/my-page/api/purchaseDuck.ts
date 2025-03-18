import { QueryClient } from "@tanstack/react-query";
import { userInfoQueries } from "@/shared/lib/auth/authQuery";
import { updateQueryClient } from "@/shared/lib/updateQueryClient";

async function purchaseDuck(currentDuck: number, queryClient: QueryClient) {
  if (currentDuck < 30) {
    return;
  }

  const response = await fetch("/api/users/purchaseduck", {
    cache: "no-cache",
  });
  if (!response.ok) {
    console.error("Failed to purchase duck");
    return;
  }
  updateQueryClient(queryClient, userInfoQueries.queryKey, (prev) => ({
    ...prev,
    duck: prev.userInfo.duck - 30,
    realDuck: prev.userInfo.realDuck + 1,
  }));
}

export { purchaseDuck };
