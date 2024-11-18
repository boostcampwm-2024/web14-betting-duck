import { createZodDto } from "nestjs-zod";
import { requestNicknameExistsSchema } from "@shared/schemas/users/request";

export class CheckNicknameExistsDto extends createZodDto(
  requestNicknameExistsSchema,
) {}
