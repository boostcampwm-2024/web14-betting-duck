import { WaitingRoom } from "@/pages/WaitingRoom";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/waiting-room")({
  component: WaitingRoom,
});
