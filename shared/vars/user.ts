export const USER_ROLE = ["user", "guest"] as const;
export type UserRole = (typeof USER_ROLE)[number];

export const UserRole = {
	USER: "user",
	GUEST: "guest",
};
