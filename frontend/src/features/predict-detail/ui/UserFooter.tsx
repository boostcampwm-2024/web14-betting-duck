import { useUserContext } from "@/shared/hooks/useUserContext";
import { useNavigate } from "@tanstack/react-router";

function UserFooter() {
  const navigate = useNavigate();
  const { setUserInfo } = useUserContext();

  const handleMyPageClick = () => {
    setUserInfo({ roomId: "", role: "user" });
    window.location.href = "/my-page";
  };

  const handleCreateClick = () => {
    setUserInfo({ roomId: "", role: "user" });
    navigate({ to: "/create-vote" });
  };

  return (
    <div className="flex w-full items-center justify-around gap-4">
      <button
        className="bg-default text-layout-main w-full rounded-lg px-4 py-2 text-lg font-extrabold"
        onClick={handleMyPageClick}
      >
        마이페이지로 돌아가기
      </button>
      <button
        className="bg-default text-layout-main w-full rounded-lg px-4 py-2 text-lg font-extrabold"
        onClick={handleCreateClick}
      >
        방 생성하러 가기
      </button>
    </div>
  );
}

export { UserFooter };
