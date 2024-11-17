import { createZodDto } from "nestjs-zod";
import { requestSignInSchema } from "@shared/schemas/users/request";

export class SignInUserDto extends createZodDto(requestSignInSchema) {}
