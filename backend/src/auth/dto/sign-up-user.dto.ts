import { createZodDto } from "nestjs-zod";
import { requestSignUpSchema } from "@shared/schemas/users/request";
import { responseSignUpSchema } from "@shared/schemas/users/response";

export class SignUpUserRequestDto extends createZodDto(requestSignUpSchema) {}

export class SignUpUserResponseDto extends createZodDto(responseSignUpSchema) {}
