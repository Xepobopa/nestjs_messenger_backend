import { Injectable } from "@nestjs/common";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { MessageEntity } from "src/entity/message.entity";
import { Repository } from "typeorm";

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(MessageEntity)
        private messageRepository: Repository<MessageEntity>
    ) {}

    async create(createMessageDto: CreateMessageDto) {
        return await this.messageRepository.create({
            text: createMessageDto.text,
            sender: { id: createMessageDto.sender_id },
            chat: { id: createMessageDto.chat_id },
        });
    }

    findAll() {
        return this.messageRepository.find();
    }

    // findOne(id: number) {
    //     return `This action returns a #${id} message`;
    // }

    // update(id: number, updateMessageDto: UpdateMessageDto) {
    //     return `This action updates a #${id} message`;
    // }

    // remove(id: number) {
    //     return `This action removes a #${id} message`;
    // }
}
