import { Module } from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { MessagesGateway } from "./messages.gateway";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageEntity } from "src/entity/message.entity";

@Module({
    imports: [TypeOrmModule.forFeature([MessageEntity])],
    providers: [MessagesGateway, MessagesService],
    exports: [MessagesService],
})
export class MessagesModule {}
