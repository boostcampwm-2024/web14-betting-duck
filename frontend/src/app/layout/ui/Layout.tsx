import { useLayout } from "@/shared/hooks/useLayout";
import { cn } from "@/shared/misc";
import { RootHeader } from "./RootHeader";
import { RootSideBar } from "./RootSidebar";
import { Suspense } from "react";
import { LoadingAnimation } from "@/shared/components/Loading";
import { useRecoilValue } from "recoil";
import { Auth } from "@/app/provider/RouterProvider/lib/auth";

const layoutStyles = {
  default: "max-w-[520px]",
  wide: "max-w-[1200px]",
} as const;

function Layout({ children }: { children: React.ReactNode }) {
  const { layoutType } = useLayout();
  const authData = useRecoilValue(Auth);

  return (
    <div
      id="root-layout"
      className={cn(
        "layout",
        `h-h-full ml-auto mr-auto grid max-h-[834px] w-full`,
        layoutStyles[layoutType],
      )}
    >
      <Suspense fallback={<LoadingAnimation />}>
        <RootHeader nickname={authData.nickname ?? ""} />
        <RootSideBar isAuthenticated={authData.isAuthenticated} />
      </Suspense>
      {children}
    </div>
  );
}

export { Layout };
