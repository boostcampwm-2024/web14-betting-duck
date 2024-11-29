import {
  Controller,
  HttpStatus,
  Res,
  Req,
  UseGuards,
  Post,
  Body,
} from "@nestjs/common";
import { Response } from "express";
import { JwtGuestAuthGuard } from "src/utils/guards/http-guest-authenticated.guard";
import { BetService } from "./bet.service";
import { PlaceBetDto } from "./dto/placeBetDto";

@Controller("/api/bets")
export class BetController {
  constructor(private betService: BetService) {}

  @UseGuards(JwtGuestAuthGuard)
  @Post()
  async placeBet(
    @Body() placeBetDto: PlaceBetDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    try {
      const bet = await this.betService.placeBet(req, placeBetDto);
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        data: bet,
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
