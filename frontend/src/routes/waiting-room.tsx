import { WaitingRoom } from "@/features/waiting-room";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/waiting-room")({
  component: WaitingRoom,
});
