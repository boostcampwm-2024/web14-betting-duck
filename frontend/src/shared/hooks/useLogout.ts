import { z } from "zod";
import { useCallback } from "react";
import { useUserContext } from "@/shared/hooks/useUserContext";
import { useSetRecoilState } from "recoil";
import { useQueryClient } from "@tanstack/react-query";
import { Auth } from "@/app/provider/RouterProvider/lib/auth";
import { authQueries } from "@/shared/lib/auth/authQuery";
import { AuthStatusTypeSchema } from "@/shared/lib/auth/guard";
import { useNavigate } from "@tanstack/react-router";

export const useLogout = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useUserContext();
  const setAuthState = useSetRecoilState(Auth);
  const queryClient = useQueryClient();

  const logout = useCallback(async () => {
    try {
      const response = await fetch("/api/users/signout", {
        credentials: "include",
        cache: "no-cache",
      });

      if (!response.ok) {
        throw new Error("로그아웃에 실패했습니다.");
      }

      setAuthState((prev) => ({
        ...prev,
        isAuthenticated: false,
        isLoading: true,
        nickname: "",
      }));

      setUserInfo({ isAuthenticated: false, nickname: "", role: "guest" });

      queryClient.setQueryData(
        authQueries.queryKey,
        (prev: z.infer<typeof AuthStatusTypeSchema>) => {
          console.log("prev", prev);
          return {
            ...prev,
            userInfo: {
              role: "guest",
              nickname: "",
              duck: 0,
              message: "OK",
              realDuck: prev.userInfo.realDuck,
            },
          };
        },
      );

      await queryClient.invalidateQueries({
        queryKey: authQueries.queryKey,
      });

      navigate({ to: "/login", replace: true });
    } catch (error) {
      console.error("Logout Error:", error);
      alert("로그아웃 중 오류가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }
  }, [navigate, setUserInfo, setAuthState, queryClient]);

  return logout;
};
