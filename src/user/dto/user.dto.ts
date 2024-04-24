import { IntersectionType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";
import { AbstractDto } from "src/dto/abstract.dto";
import { IsBoolean, IsEnum } from "class-validator";
import { EUserStatus } from "src/enum/user-status.enum";

export class UserDto extends IntersectionType(CreateUserDto, AbstractDto) {
    @IsBoolean()
    is_activated: boolean;

    @IsEnum(EUserStatus)
    status: EUserStatus;

    // TODO: add ChatDto
    // chats: ChatDto[];
}
