import { Module } from "@nestjs/common";
import { ChatGateway } from "./chat.gateway";
import { ChatService } from "./chat.service";
import { UserModule } from "src/user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChatEntity } from "src/entity/chat.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ChatEntity]), UserModule],
    providers: [ChatGateway, ChatService],
})
export class ChatModule {}
