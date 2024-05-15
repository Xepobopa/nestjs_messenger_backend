import { IsUUID } from "class-validator";

export class JoinDto {
    @IsUUID()
    public chatUId: string;

    @IsUUID()
    public userUid: string;
}
