import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/create-vote")({
  component: RouteComponent,
});

function RouteComponent() {
  return "Hello /create-vote!";
}
