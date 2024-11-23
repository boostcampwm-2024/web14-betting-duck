// import { LoginPage } from "@/features/login-page";
import { LoginPage } from "@/features/login-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: Component,
});

function Component() {
  return <LoginPage />;
}
