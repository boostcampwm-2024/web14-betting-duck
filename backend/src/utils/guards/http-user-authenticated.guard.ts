import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import * as jwt from "jsonwebtoken";

@Injectable()
export class JwtUserAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const accessToken = this.extractAccessToken(request);

    if (!accessToken) {
      return false;
    }

    try {
      const payload = this.verifyToken(accessToken);

      if (!this.isUserRole(payload.role)) {
        return false;
      }

      request["user"] = { ...payload, id: Number(payload.id) };
      return true;
    } catch (err) {
      console.error("Token verification error:", err);
      return false;
    }
  }

  private extractAccessToken(request: Request): string | undefined {
    return request.cookies["access_token"];
  }

  private verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET || "secret");
  }

  private isUserRole(role: string): boolean {
    return role === "user";
  }
}
