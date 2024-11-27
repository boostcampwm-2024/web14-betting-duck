import { z } from "zod";

const ROUTE_PATHS = {
  LOGIN: "/login",
  GUEST_LOGIN: "/guest-login",
  GUEST_CREATE_VOTE: "/guest-vote",
  BETTING: "/betting",
  BETTING_WAITING: "/betting_/$roomId/waiting",
  BETTING_VOTE: "/betting_/$roomId/vote",
  CREATE_VOTE: "/create-vote",
  MYPAGE: "/my-page",
  REQUIRE_LOGIN: "/require-login",
} as const;

type RouteKeys = keyof typeof ROUTE_PATHS;
type Routes = {
  readonly [K in RouteKeys]: string;
};

const ROUTES: Routes = Object.freeze(ROUTE_PATHS);

// zod enum 스키마 생성
const ROUTE_PATH_ENUM = z.enum([
  "/login",
  "/betting",
  "/betting_/$roomId/waiting",
  "/betting_/$roomId/vote",
  "/create-vote",
  "/my-page",
  "/require-login",
  "/guest-login",
  "/guest-vote",
]);

const ROUTES_PATH = ROUTE_PATH_ENUM.options;

export { ROUTES, ROUTES_PATH, ROUTE_PATH_ENUM, type Routes };
