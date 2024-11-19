import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: Component,
});

function Component() {
  return (
    <div>
      <h1>Login</h1>
    </div>
  );
}
