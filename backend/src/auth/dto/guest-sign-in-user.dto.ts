import { createZodDto } from "nestjs-zod";
import { requestGuestSignInSchema } from "@shared/schemas/users/request";

export class GuestSignInUserDto extends createZodDto(
  requestGuestSignInSchema,
) {}
