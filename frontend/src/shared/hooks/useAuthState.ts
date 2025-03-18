import { useRecoilState } from "recoil";
import { Auth } from "@/app/provider/RouterProvider/lib/auth";

function useAuthState() {
  const [authState, setAuthState] = useRecoilState(Auth);
  if (!authState) {
    throw new Error("AuthState가 존재하지 않습니다.");
  }
  return { authState, setAuthState };
}

export { useAuthState };
