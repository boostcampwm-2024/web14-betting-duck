// auth.guard.ts
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import * as jwt from "jsonwebtoken";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const accessToken = request.cookies["access_token"];

    if (!accessToken) {
      return false;
    }

    try {
      const payload = jwt.verify(
        accessToken,
        process.env.JWT_SECRET || "secret",
      );

      request["user"] = payload;

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
