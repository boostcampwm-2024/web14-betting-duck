import * as jwt from "jsonwebtoken";

export class JwtUtils {
  parseCookies(cookieHeader?: string): Record<string, string> {
    if (!cookieHeader) return {};
    return cookieHeader.split(";").reduce(
      (cookies, cookie) => {
        const [key, value] = cookie.split("=").map((part) => part.trim());
        cookies[key] = decodeURIComponent(value);
        return cookies;
      },
      {} as Record<string, string>,
    );
  }

  verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET || "secret");
  }
}
