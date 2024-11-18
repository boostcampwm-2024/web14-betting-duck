import { CreateVotePage } from "@/features/create-vote";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/create-vote")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CreateVotePage />;
}
