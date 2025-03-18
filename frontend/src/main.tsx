import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GlobalRouter } from "./app/provider/RouterProvider";
import { RecoilRoot } from "recoil";
import { AuthProvider } from "./app/provider/AuthProvider/AuthProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const theme = createTheme();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <GlobalRouter queryClient={queryClient} />
          </ThemeProvider>
        </AuthProvider>
      </RecoilRoot>
    </QueryClientProvider>
  </StrictMode>,
);
