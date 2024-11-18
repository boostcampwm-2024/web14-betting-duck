import { createZodDto } from "nestjs-zod";
import { requestSignInSchema } from "@shared/schemas/users/request";

export class SignInUserRequestDto extends createZodDto(requestSignInSchema) {}
