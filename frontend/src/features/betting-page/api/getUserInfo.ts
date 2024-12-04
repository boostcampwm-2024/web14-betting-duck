import { responseUserInfoSchema } from "@betting-duck/shared";

async function getUserInfo() {
  const response = await fetch("/api/users/userInfo");
  if (!response.ok) {
    return null;
  }

  const { data } = await response.json();
  const result = responseUserInfoSchema.safeParse(data);
  if (!result.success) {
    console.error(result.error);
    return null;
  }

  return data;
}

export { getUserInfo };
