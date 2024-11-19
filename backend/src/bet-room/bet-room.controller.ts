import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Patch,
  Get,
  Res,
  Param,
} from "@nestjs/common";
import { BetRoomService } from "./bet-room.service";
import { Response } from "express";
import { CreateBetRoomDto } from "./dto/create-bet-room.dto";
import { UpdateBetRoomDto } from "./dto/update-bet-room.dto";

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

  @Patch("/:betRoomId")
  async updateBetRoom(
    @Param("betRoomId") betRoomId: string,
    @Body() updateBetRoomDto: UpdateBetRoomDto,
    @Res() res: Response,
  ) {
    try {
      await this.betRoomService.updateBetRoom(betRoomId, updateBetRoomDto);
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        data: {
          message: "OK",
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

  @Patch("/end/:betRoomId")
  async finishBetRoom(
    @Param("betRoomId") betRoomId: string,
    @Body("winning_option") winningOption: "option1" | "option2",
    @Res() res: Response,
  ) {
    try {
      await this.betRoomService.finishBetRoom(betRoomId, winningOption);
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        data: {
          message: "배팅이 종료되었습니다",
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

  @Get("/:betRoomId")
  async getBetRoom(
    @Param("betRoomId") betRoomId: string,
    @Res() res: Response,
  ) {
    try {
      const betRoom = await this.betRoomService.findBetRoomById(betRoomId);

      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        data: {
          channel: {
            id: betRoom.id,
            title: betRoom.title,
            creator: {
              id: betRoom.manager.id,
            },
            options: {
              option1: {
                name: betRoom.option1,
              },
              option2: {
                name: betRoom.option2,
              },
            },
            status: betRoom.status,
            settings: {
              defaultBetAmount: betRoom.defaultBetAmount,
              duration: betRoom.timer,
            },
            metadata: {
              createdAt: betRoom.createdAt,
              startAt: betRoom.startTime,
              endAt: betRoom.endTime,
            },
            urls: {
              invite: betRoom.joinUrl,
            },
          },
          message: "OK",
        },
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        data: {
          message: error.message || "Internal Server Error",
        },
      });
    }
  }
}
