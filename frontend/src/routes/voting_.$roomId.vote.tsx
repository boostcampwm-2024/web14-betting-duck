import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/voting_/$roomId/vote")({
  component: RouteComponent,
});

function RouteComponent() {
  return "Hello /voting/$roomId/vote!";
}
