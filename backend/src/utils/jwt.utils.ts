import * as jwt from "jsonwebtoken";

export class JwtUtils {
  verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET || "secret");
  }
}
