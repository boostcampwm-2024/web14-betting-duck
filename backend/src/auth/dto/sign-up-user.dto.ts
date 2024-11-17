import { createZodDto } from "nestjs-zod";
import { requestSignUpSchema } from "@shared/schemas/users/request";

export class SignUpUserDto extends createZodDto(requestSignUpSchema) {}
