export const config = {
  socketUrl: __SOCKET_URL__,
  appEnv: __APP_ENV__,
  isDevelopment: __APP_ENV__ === "development",
  isProduction: __APP_ENV__ === "production",
} as const;

export type Config = typeof config;
