import { responseBetRoomInfo } from "@betting-duck/shared";
import { z } from "zod";

export const STORAGE_KEY = "betting_pool";
export const DEFAULT_BETTING_ROOM_INFO: z.infer<typeof responseBetRoomInfo> = {
  message: "OK",
  channel: {
    id: "",
    title: "",
    creator: {
      id: 0,
    },
    options: {
      option1: {
        name: "",
      },
      option2: {
        name: "",
      },
    },
    status: "active",
    settings: {
      defaultBetAmount: 0,
      duration: 0,
    },
    metadata: {
      createdAt: "",
      startAt: "",
      endAt: "",
    },
    urls: {
      invite: "",
    },
    isAdmin: false,
  },
};
