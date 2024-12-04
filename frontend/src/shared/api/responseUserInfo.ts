import { responseUserInfoSchema } from "@betting-duck/shared";
import { z } from "zod";

async function responseUserInfo(): Promise<
  z.infer<typeof responseUserInfoSchema>
> {
  const response = await fetch("/api/users/userInfo");
  if (!response.ok) {
    throw new Error(
      `사용자 정보를 불러오는데 실패했습니다. Status: ${response.status}`,
    );
  }

  const { data } = await response.json();
  const result = responseUserInfoSchema.safeParse(data);
  if (!result.success) {
    console.error(result.error);
    throw new Error("사용자 정보를 불러오는데 실패했습니다.");
  }

  return result.data;
}

export { responseUserInfo };
