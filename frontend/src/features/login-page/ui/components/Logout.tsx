import { LogoutIcon } from "@/shared/icons/Logout";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useRouteContext } from "@tanstack/react-router";

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
          document.cookie.split(";").forEach((cookie) => {
            const [name] = cookie.split("=");
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
          });

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
