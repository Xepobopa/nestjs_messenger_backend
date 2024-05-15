import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
} from "@nestjs/websockets";
import { Socket } from "socket.io";
import { ChatService } from "./chat.service";
import { CreateChatDto } from "./dto/create-chat.dto";
import { JoinDto } from "./dto/join.dto";

// TODO: An idea how to get online users.
// When user join to chat, add him to clients: Socket[] array and create array users: string[] with thier UUID and chats.
// When user disconnect, remove him from clients.
// We have an awrray (clients) that contains all online users (sockets).
// Its also very useful for sending events to all online users.
// Its also very useful for getting userUUID not from params, but from socketToUser array.

@WebSocketGateway()
export class ChatGateway {
    constructor(private readonly chatService: ChatService) {}

    @SubscribeMessage("createChat")
    create(@MessageBody() createChatDto: CreateChatDto) {
        return this.chatService.create(createChatDto);
    }

    /**
     * Join provided user to chat. If joined successfully, send a "joined" event to user with updated chat with him in members array.
     *
     * @param {JoinDto} joinDto - chatUid - chat, which user want to join, userUid - user that want to join to chat.
     * @return {ChatEntity} Returns a chat with joined user.
     */
    @SubscribeMessage("join")
    async joinRoom(
        @MessageBody() joinDto: JoinDto,
        @ConnectedSocket() client: Socket
    ) {
        const chat = await this.chatService.join(
            joinDto.chatUId,
            joinDto.userUid
        );

        client.send("joined", chat);

        return chat;
    }

    // @SubscribeMessage("findAllChat")
    // findAll() {
    //     return this.chatService.findAll();
    // }

    // @SubscribeMessage("findOneChat")
    // findOne(@MessageBody() id: number) {
    //     return this.chatService.findOne(id);
    // }

    // @SubscribeMessage("updateChat")
    // update(@MessageBody() updateChatDto: UpdateChatDto) {
    //     return this.chatService.update(updateChatDto.id, updateChatDto);
    // }

    // @SubscribeMessage("removeChat")
    // remove(@MessageBody() id: number) {
    //     return this.chatService.remove(id);
    // }
}
