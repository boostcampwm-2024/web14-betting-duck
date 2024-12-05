export const USER_ROLE = ["user", "guest", "admin"] as const;
export type UserRole = (typeof USER_ROLE)[number];
