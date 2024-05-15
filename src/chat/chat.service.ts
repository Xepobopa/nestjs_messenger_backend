import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WsException } from "@nestjs/websockets";
import { ChatEntity } from "src/entity/chat.entity";
import { UserEntity } from "src/entity/user.entity";
import { EChatTypes } from "src/enum/chat-types.enum";
import { UserService } from "src/user/user.service";
import { Repository } from "typeorm";
import { CreateChatDto } from "./dto/create-chat.dto";

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(ChatEntity)
        private chatRepository: Repository<ChatEntity>,
        private readonly userService: UserService
    ) {}

    create(createChatDto: CreateChatDto) {
        let users: Array<UserEntity>;
        createChatDto.members.forEach(async (member) => {
            const user = await this.userService.findOneNoError(member);
            if (!user) throw new WsException("Provided user member not found");
            users.push(user);
        });

        const chat = this.chatRepository.create({
            ...createChatDto,
            members: users,
        });

        return chat;
    }

    async join(chatUid: string, userUid: string) {
        const chat = await this.chatRepository.findOne({
            where: { uuid: chatUid },
        });
        if (!chat) throw new WsException("Chat not found");
        // If chat is private (only for 2 persons), we can't join to this chat
        if (chat.type === EChatTypes.PRIVATE)
            throw new WsException("Chat is private");

        const user = await this.userService.findOneNoError(userUid);
        if (!user) throw new WsException("User not found");

        if (chat.members.some((member) => member.uuid === user.uuid))
            throw new WsException("User already in chat");

        chat.members.push(user);

        return await this.chatRepository.save(chat);
    }

    // findAll() {
    //     return `This action returns all chat`;
    // }

    // findOne(id: number) {
    //     return `This action returns a #${id} chat`;
    // }

    // update(id: number, updateChatDto: UpdateChatDto) {
    //     return `This action updates a #${id} chat`;
    // }

    // remove(id: number) {
    //     return `This action removes a #${id} chat`;
    // }
}
