import { IsNumber, IsString, Min } from "class-validator";
import { AbstractDto } from "src/dto/abstract.dto";

export class MessageDto extends AbstractDto {
    @IsString()
    public text: string;

    @IsNumber()
    @Min(1)
    public sender_id: number;

    @IsNumber()
    @Min(1)
    public chat_id: number;
}
