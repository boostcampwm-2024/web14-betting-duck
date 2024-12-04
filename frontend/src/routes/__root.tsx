import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { RootHeader } from "@/shared/components/RootHeader";
import { RootSideBar } from "@/shared/components/RootSideBar";
import { UserProvider } from "@/app/provider/UserProvider";
import { GlobalErrorComponent } from "@/shared/components/Error/GlobalError";
import { cn } from "@/shared/misc";
import { useLayout } from "@/shared/hooks/useLayout";
import { LayoutProvider } from "@/app/provider/LayoutProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { authQueries, queryClient } from "@/shared/lib/auth/authQuery";
import { RouterContext } from "@/main";
import { AuthStatusTypeSchema } from "@/shared/lib/auth/guard";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <LayoutProvider>
        <UserProvider>
          <RootLayout>
            <RootHeader />
            <RootSideBar />
            <Outlet />
          </RootLayout>
        </UserProvider>
      </LayoutProvider>
    </QueryClientProvider>
  ),
  errorComponent: ({ error }) => <GlobalErrorComponent error={error} to="/" />,
  loader: async ({ context }) => {
    try {
      const result = await context.queryClient.ensureQueryData(authQueries);
      const parsedResult = AuthStatusTypeSchema.safeParse(result);
      if (!parsedResult.success) {
        return {
          isAuthenticated: false,
          userInfo: {
            message: "로그인이 필요합니다.",
            role: "guest",
            nickname: "",
            duck: 0,
          },
        };
      }
      context.queryClient.setQueryData(authQueries.queryKey, parsedResult.data);
      return parsedResult.data;
    } catch (error) {
      console.error("Root loader error:", error);
      return {
        isAuthenticated: false,
        userInfo: {
          message: "인증 상태를 확인할 수 없습니다.",
          role: "guest",
          nickname: "",
          duck: 0,
        },
      };
    }
  },
});

const layoutStyles = {
  default: "max-w-[520px]",
  wide: "max-w-[1200px]",
} as const;

function RootLayout({ children }: { children: React.ReactNode }) {
  const { layoutType } = useLayout();

  return (
    <div
      id="root-layout"
      className={cn(
        "layout",
        `h-h-full ml-auto mr-auto grid max-h-[834px] w-full`,
        layoutStyles[layoutType],
      )}
    >
      {children}
    </div>
  );
}

export { RootLayout };
