import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Patch,
  Res,
  Param,
} from "@nestjs/common";
import { BetRoomService } from "./bet-room.service";
import { Response } from "express";
import { CreateBetRoomDto } from "./dto/create-bet-room.dto";

@Controller("/api/betrooms")
export class BetRoomController {
  constructor(private betRoomService: BetRoomService) {}

  @Post()
  async createBetRoom(
    @Body() createBetRoomDto: CreateBetRoomDto,
    @Res() res: Response,
  ) {
    try {
      const newBetRoom =
        await this.betRoomService.createBetRoom(createBetRoomDto);
      return res.status(HttpStatus.CREATED).json({
        status: HttpStatus.CREATED,
        data: {
          roomId: newBetRoom.id,
          message: "Created",
        },
      });
    } catch (error) {
      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        data: {
          message: error.message || "Internal Server Error",
        },
      });
    }
  }

  @Patch("/start/:betRoomId")
  async startBetRoom(
    @Param("betRoomId") betRoomId: string,
    @Res() res: Response,
  ) {
    try {
      await this.betRoomService.startBetRoom(betRoomId);
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        data: {
          message: "배팅이 시작되었습니다.",
          betRoomId: betRoomId,
        },
      });
    } catch (error) {
      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        data: { message: error.message },
      });
    }
  }
}
