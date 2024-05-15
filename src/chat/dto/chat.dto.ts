import { Type } from "class-transformer";
import {
    IsArray,
    IsEnum,
    IsOptional,
    IsString,
    ValidateNested,
} from "class-validator";
import { AbstractDto } from "src/dto/abstract.dto";
import { EChatTypes } from "src/enum/chat-types.enum";
import { MessageDto } from "src/messages/dto/message.dto";
import { UserDto } from "src/user/dto/user.dto";

export class ChatDto extends AbstractDto {
    public title: string;

    @IsEnum(EChatTypes)
    public type: EChatTypes;

    @IsString()
    public photo_url: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UserDto)
    members: UserDto[];

    @Type(() => MessageDto)
    @IsOptional()
    last_message: MessageDto | null;
}
