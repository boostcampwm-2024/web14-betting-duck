import { LogoutIcon } from "@/shared/icons/Logout";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useRouteContext } from "@tanstack/react-router";

function logout() {
  // 모든 가능한 조합으로 쿠키 삭제 시도
  const cookieSettings = [
    // 기본 설정
    "access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/",
    // 모든 path 조합
    "access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/api",
    // httpOnly가 아닌 경우를 위한 설정
    "access_token=; max-age=-99999999; path=/",
    // 도메인 설정
    `access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}`,
    // subdomain을 포함한 도메인 설정
    `access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${window.location.hostname}`,
    // Secure 옵션 포함
    "access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; secure",
    // SameSite 옵션들 포함
    "access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; secure; samesite=strict",
    "access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; secure; samesite=lax",
    "access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; secure; samesite=none",
  ];

  // 모든 설정 조합 적용
  cookieSettings.forEach((setting) => {
    document.cookie = setting;
  });
}

function LogoutButton() {
  const navigate = useNavigate();
  const context = useRouteContext({
    from: "__root__",
  });
  const queryClient = useQueryClient(context.queryClient);

  return (
    <nav className="flex select-none flex-col items-center gap-6">
      <button
        className="w-full"
        onClick={async () => {
          const response = await fetch("/api/users/signout");
          if (!response.ok) {
            throw new Error("로그아웃에 실패했습니다.");
          }
          logout();
          await queryClient.setQueryData(["auth"], {
            isAuthenticated: false,
            userInfo: {
              message: "로그인이 필요합니다.",
              role: "guest",
              nickname: "",
              duck: 0,
            },
          });

          return navigate({
            to: "/login",
          });
        }}
      >
        <div
          className={
            "font-nanum-b flex cursor-pointer flex-col items-center gap-2 text-center"
          }
        >
          <LogoutIcon />
          <span className="font-nanum-eb text-xs">logout</span>
        </div>
      </button>
    </nav>
  );
}

export { LogoutButton };
