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
} from "./socket/response";

export {
  betRequestSchema,
  betResponseSchema,
  fetchBetRoomInfoRequestSchema,
  type fetchBetRoomInfoRequestType,
  joinBetRoomRequestSchema,
  type joinBetRoomRequestType,
  responseFetchBetRoomInfoSchema,
  responseFetchBetRoomInfoType,
};
