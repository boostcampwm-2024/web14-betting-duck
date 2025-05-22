import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Patch,
  Get,
  Req,
  Res,
  Param,
  UseGuards,
  Delete,
} from "@nestjs/common";
import { BetRoomService } from "./bet-room.service";
import { Response } from "express";
import { CreateBetRoomDto } from "./dto/create-bet-room.dto";
import { UpdateBetRoomDto } from "./dto/update-bet-room.dto";
import { JwtUserAuthGuard } from "src/utils/guards/http-user-authenticated.guard";
import { JwtGuestAuthGuard } from "src/utils/guards/http-guest-authenticated.guard";

@Controller("/api/betrooms")
export class BetRoomController {
  constructor(private betRoomService: BetRoomService) {}

  @UseGuards(JwtUserAuthGuard)
  @Post()
  async createBetRoom(
    @Body() createBetRoomDto: CreateBetRoomDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const newBetRoom = await this.betRoomService.createBetRoom(
        req["user"].id,
        createBetRoomDto,
      );
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

  @UseGuards(JwtUserAuthGuard)
  @Patch("/:betRoomId")
  async updateBetRoom(
    @Param("betRoomId") betRoomId: string,
    @Body() updateBetRoomDto: UpdateBetRoomDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      await this.betRoomService.updateBetRoom(
        req["user"].id,
        betRoomId,
        updateBetRoomDto,
      );
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

  @UseGuards(JwtUserAuthGuard)
  @Patch("/start/:betRoomId")
  async startBetRoom(
    @Param("betRoomId") betRoomId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      await this.betRoomService.startBetRoom(req["user"].id, betRoomId);
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

  @UseGuards(JwtUserAuthGuard)
  @Patch("/end/:betRoomId")
  async finishBetRoom(
    @Param("betRoomId") betRoomId: string,
    @Body("winning_option") winningOption: "option1" | "option2",
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      await this.betRoomService.finishBetRoom(
        req["user"].id,
        betRoomId,
        winningOption,
      );
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

  @UseGuards(JwtUserAuthGuard)
  @Patch("/refund/:betRoomId")
  async refundBetRoom(
    @Param("betRoomId") betRoomId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      await this.betRoomService.refundBetRoom(req["user"].id, betRoomId);
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        data: {
          message: "베팅 정산이 취소되었습니다.",
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

  @UseGuards(JwtGuestAuthGuard)
  @Get("/:betRoomId")
  async getBetRoom(
    @Param("betRoomId") betRoomId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const userId = req["user"].id;
      const betRoomData = await this.betRoomService.findBetRoomById(
        userId,
        betRoomId,
      );
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        data: {
          channel: betRoomData,
          message: "OK",
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

  @UseGuards(JwtUserAuthGuard)
  @Delete("/:betRoomId")
  async deleteBetRoom(
    @Param("betRoomId") betRoomId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const userId = req["user"].id;
      await this.betRoomService.deleteBetRoom(betRoomId, userId);
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        data: {
          message: "OK",
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
}
