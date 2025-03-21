import { useUserContext } from "@/shared/hooks/useUserContext";
import { createPrediction } from "./api";
import { formatPredictionData } from "./helpers/formatData";
import { useNavigate } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { authQueries } from "@/shared/lib/auth/authQuery";
import { AuthStatusTypeSchema } from "@/shared/lib/auth/guard";
import { z } from "zod";

function usePredictionStore(queryClient: QueryClient) {
  const { setUserInfo } = useUserContext();
  const navigate = useNavigate();
  const submitPrediction = async (formData: FormData) => {
    const requestData = formatPredictionData({
      title: (formData.get("title") as string) || "",
      winCase: (formData.get("winCase") as string) || "",
      loseCase: (formData.get("loseCase") as string) || "",
      timer: (Number(formData.get("timer")) as number) || 1,
      coin: (Number(formData.get("coin")) as number) || 100,
    });
    try {
      const result = await createPrediction(requestData);
      if (!result) throw new Error("실패");
      setUserInfo({ roomId: result.data.roomId, role: "admin" });

      queryClient.setQueryData(
        authQueries.queryKey,
        (
          prevData: z.infer<typeof AuthStatusTypeSchema>,
        ): z.infer<typeof AuthStatusTypeSchema> => {
          const parsedData = AuthStatusTypeSchema.safeParse(prevData);
          if (!parsedData.success) {
            return prevData;
          }
          return {
            ...parsedData.data,
            userInfo: {
              ...parsedData.data.userInfo,
              role: "admin",
            },
          };
        },
      );
      await queryClient.invalidateQueries({ queryKey: authQueries.queryKey });

      navigate({
        to: `/betting/${result.data.roomId}/waiting`,
      });
    } catch (error) {
      console.error("승부예측 정보 전송 오류:", error);
    }
  };

  return {
    submitPrediction,
  };
}

export { usePredictionStore };
