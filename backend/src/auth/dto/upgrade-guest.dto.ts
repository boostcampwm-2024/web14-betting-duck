import { createZodDto } from "nestjs-zod";
import { requestUpgradeGuest } from "@shared/schemas/users/request";

export class UpgradeGuestRequestDto extends createZodDto(requestUpgradeGuest) {}
