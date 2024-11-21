import { betRequestSchema } from "./request";
import { betResponseSchema } from "./response";
import {
  fetchBetRoomInfoRequestSchema,
  fetchBetRoomInfoRequestType,
  joinBetRoomRequestSchema,
  joinBetRoomRequestType,
} from "./socket/request";
import {
  responseFetchBetRoomInfoSchema,
  type responseFetchBetRoomInfoType,
  responseBetRoomInfo,
} from "./socket/response";

export {
  responseBetRoomInfo,
  betRequestSchema,
  betResponseSchema,
  fetchBetRoomInfoRequestSchema,
  type fetchBetRoomInfoRequestType,
  joinBetRoomRequestSchema,
  type joinBetRoomRequestType,
  responseFetchBetRoomInfoSchema,
  responseFetchBetRoomInfoType,
};
