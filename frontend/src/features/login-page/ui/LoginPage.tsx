import { cn } from "@/shared/misc";
import { useState } from "react";
import mainLogo from "@/assets/images/main-logo.png";
import {
  GuestLoginForm,
  LoginForm,
  RegisterForm,
  TabButton,
} from "./components";
import { Alert, Snackbar } from "@mui/material";

function LoginPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register" | "guest">(
    "login",
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleTabChange = (tab: "login" | "register" | "guest") => {
    setActiveTab(tab);
  };

  const handleSnackbarClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return; // Snackbar 클릭 방지
    }
    setSnackbarOpen(false); // Snackbar 닫기
  };

  return (
    <div className="bg-layout-main flex w-full flex-col items-center p-8">
      <div className="mt-4 text-center">
        <h1 className="text-default text-xl font-extrabold">로그인</h1>
        <p className="text-default">오리를 구매해서 페이지를 꾸며보세요</p>
      </div>
      <img src={mainLogo} alt="Main Logo" className="mb-3" />
      <div className="bg-layout-sidebar relative flex w-[90%] overflow-hidden rounded-full text-[#7A8495] shadow-inner">
        <div
          className={cn(
            "bg-default absolute h-full w-1/3 transition-transform duration-300",
            activeTab === "login" && "translate-x-0",
            activeTab === "register" && "translate-x-full",
            activeTab === "guest" && "translate-x-[200%]",
          )}
        />
        <TabButton
          label="로그인"
          tab="login"
          activeTab={activeTab}
          onClick={handleTabChange}
        />
        <TabButton
          label="회원가입"
          tab="register"
          activeTab={activeTab}
          onClick={handleTabChange}
        />
        <TabButton
          label="비회원"
          tab="guest"
          activeTab={activeTab}
          onClick={handleTabChange}
        />
      </div>
      {activeTab === "login" && <LoginForm />}
      {activeTab === "register" && (
        <RegisterForm
          setActiveTab={setActiveTab}
          setSnackbarOpen={setSnackbarOpen}
        />
      )}

      {activeTab === "guest" && <GuestLoginForm />}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          "회원가입 성공! 로그인하세요."
        </Alert>
      </Snackbar>
    </div>
  );
}

export { LoginPage };
