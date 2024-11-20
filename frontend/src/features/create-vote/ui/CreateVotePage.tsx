import { useNavigate } from "@tanstack/react-router";
import { usePredictionStore } from "../model/store";
import { useValidation } from "../model/useValidation";
import { CaseInputs, CoinInput, Timer, TitleInput } from "./components";

function CreateVotePage() {
  const { isFormValid } = useValidation();
  const { submitPrediction } = usePredictionStore();
  const navigate = useNavigate();

  const handleCancelClick = () => {
    navigate({ to: "/my-page" });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    submitPrediction(formData);
  };

  return (
    <div className="bg-layout-main flex w-full flex-col items-center gap-4 p-9">
      <h1 className="text-default my-8 text-xl font-extrabold">
        승부 예측 생성하기
      </h1>

      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
        <div className="bg-layout-sidebar w-full rounded-lg shadow-inner">
          <TitleInput />
        </div>

        <div className="bg-layout-sidebar w-full rounded-lg shadow-inner">
          <CaseInputs />
        </div>
        <div className="flex w-full gap-2">
          <Timer />
          <CoinInput />
        </div>
        <div className="mt-4 flex w-full gap-2">
          <button
            type="button"
            onClick={handleCancelClick}
            className="bg-secondary hover:bg-secondary-hover shadow-middle text-default w-1/2 rounded-lg px-8 py-4 font-semibold hover:text-white"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={!isFormValid}
            className="bg-primary hover:bg-primary-hover disabled:bg-primary-disabled shadow-middle w-1/2 rounded-lg px-8 py-4 font-semibold text-white"
          >
            생성
          </button>
        </div>
      </form>
    </div>
  );
}

export { CreateVotePage };
