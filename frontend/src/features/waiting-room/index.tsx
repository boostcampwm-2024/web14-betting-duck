import { WaitingRoomHeader } from "./ui/WaitingRoomHeader";
import { ParticipantsList } from "./ui/ParticipantsList";
import { ShareLinkCard } from "@/features/waiting-room/ui/SharedLinkCard";
import { AdminFooter } from "./ui/AdminFooter";
import { MemberFooter } from "./ui/MemberFooter";
import { WaitingRoomProvider } from "./provider/WaitingRoomProvider";
import { useParams } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { bettingRoomQueryKey } from "@/shared/lib/bettingRoomInfo";
import { getBettingRoomInfo } from "../betting-page/api/getBettingRoomInfo";
import { BettingRoomInfoSchema } from "@/shared/types";
import { Alert, Snackbar } from "@mui/material";
import React from "react";

function WaitingRoom() {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const { roomId } = useParams({
    from: "/betting_/$roomId/waiting",
  });
  const { data } = useSuspenseQuery({
    queryKey: bettingRoomQueryKey(roomId),
    queryFn: () => getBettingRoomInfo(roomId),
  });
  const parsedData = BettingRoomInfoSchema.safeParse(data);
  if (!parsedData.success) {
    throw new Error("방 정보를 불러오는데 실패했습니다.");
  }

  const handleSnackbarClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <WaitingRoomProvider>
      <div className="bg-layout-main flex h-full w-full flex-col justify-around">
        <WaitingRoomHeader bettingRoomInfo={parsedData.data} />
        <section className="flex flex-col gap-6 px-4">
          <ParticipantsList />
          <ShareLinkCard />
        </section>
        <div className="flex flex-row gap-4 px-4 text-lg font-extrabold">
          {parsedData.data.channel.isAdmin ? (
            <AdminFooter
              bettingRoomInfo={parsedData.data}
              setSnackbarOpen={setSnackbarOpen}
            />
          ) : (
            <MemberFooter
              setSnackbarOpen={setSnackbarOpen}
              bettingRoomInfo={parsedData.data}
            />
          )}
        </div>
      </div>
      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          sx={{ width: "100%" }}
          severity={"error"}
        >
          방이 아직 시작 되는 중입니다! 다시 참여하기 버튼을 눌러주세요!
        </Alert>
      </Snackbar>
    </WaitingRoomProvider>
  );
}

export { WaitingRoom };
