import {
  Controller,
  HttpStatus,
  Get,
  Res,
  Param,
  UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import { BetResultService } from "./bet-result.service";
import { JwtGuestAuthGuard } from "src/utils/guards/http-guest-authenticated.guard";

@Controller("/api/betresults")
export class BetResultController {
  constructor(private betResultService: BetResultService) {}

  @UseGuards(JwtGuestAuthGuard)
  @Get("/:betRoomId")
  async getBetResult(
    @Param("betRoomId") betRoomId: string,
    @Res() res: Response,
  ) {
    try {
      const betResult = await this.betResultService.findBetRoomById(betRoomId);
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        data: betResult,
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
