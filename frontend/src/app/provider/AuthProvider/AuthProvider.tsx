import { useEffect } from "react";
import { Fragment } from "react/jsx-runtime";
import { useSetRecoilState } from "recoil";
import { Auth } from "@/app/provider/RouterProvider/lib/auth";
import { useQuery } from "@tanstack/react-query";
import { authQueries } from "@/shared/lib/auth/authQuery";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const setAuthState = useSetRecoilState(Auth);
  const { data, isLoading } = useQuery({
    queryKey: authQueries.queryKey,
    queryFn: authQueries.queryFn,
  });

  useEffect(() => {
    if (!isLoading) {
      if (data?.isAuthenticated) {
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          isAuthenticated: data.isAuthenticated,
          nickname: data.userInfo.nickname,
        }));
      } else {
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          isAuthenticated: false,
        }));
      }
    }
  }, [data, isLoading, setAuthState]);

  return <Fragment>{children}</Fragment>;
}

export { AuthProvider };
