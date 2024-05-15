import { PickType } from "@nestjs/mapped-types";
import { ChatDto } from "./chat.dto";
import { IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class CreateChatDto extends PickType(ChatDto, [
    "title",
    "type",
    "photo_url",
]) {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => String)
    members: Array<string>;
}
