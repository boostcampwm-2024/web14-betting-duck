import React from "react";
import { responseUserInfoSchema } from "@betting-duck/shared";

function useDuckCoin() {
  const [duckCoin, setDuckCoin] = React.useState(0);

  React.useEffect(() => {
    (async () => {
      const response = await fetch("/api/users/userInfo");
      if (!response.ok) {
        throw new Error("사용자 정보를 불러오는데 실패했습니다.");
      }

      const { data } = await response.json();
      const result = responseUserInfoSchema.safeParse(data);
      if (!result.success) {
        console.error(result.error);
        throw new Error("사용자 정보를 불러오는데 실패했습니다.");
      }

      setDuckCoin(result.data.duck);
    })();
  }, []);

  return duckCoin;
}

export { useDuckCoin };
