import { useQueryClient } from "@tanstack/react-query";
import { AuthStatusTypeSchema } from "../lib/auth/guard";
import { z } from "zod";
import { authQueries } from "../lib/auth/authQuery";

type UserInfoType = z.infer<typeof AuthStatusTypeSchema>;

export function useUpdateUserStatus() {
  const queryClient = useQueryClient();

  const updateAuthStatus = (
    isAuthenticated: boolean,
    userInfo: UserInfoType["userInfo"],
  ) => {
    queryClient.setQueryData(authQueries.queryKey, {
      data: {
        isAuthenticated,
        userInfo,
      },
    });
  };
  return { updateAuthStatus };
}
// const login = async (/* login params */) => {
//   // 로그인 로직
//   // ...
//   updateAuthStatus(true, userInfo);
// };

// const logout = async () => {
//   // 로그아웃 로직
//   // ...
//   updateAuthStatus(false, defaultUserInfo);
// };

// return { login, logout };
