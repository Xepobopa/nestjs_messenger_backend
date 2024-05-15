import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    WebSocketServer,
} from "@nestjs/websockets";
import { MessagesService } from "./messages.service";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { Server } from "socket.io";
import { JoinDto } from "../chat/dto/join.dto";

@WebSocketGateway({
    cors: {
        origin: "*",
        methods: "*",
        allowedHeaders: "*",
        credentials: true,
        exposedHeaders: "*",
    },
    allowEIO3: true,
    allowUpgrades: true,
})
// implements OnGatewayConnection, OnGatewayDisconnect
export class MessagesGateway {
    @WebSocketServer()
    server: Server;

    constructor(private readonly messagesService: MessagesService) {}

    // handleConnection(client: any, ...args: any[]) {}

    // handleDisconnect(client: any) {}

    @SubscribeMessage("createMessage")
    async create(@MessageBody() createMessageDto: CreateMessageDto) {
        const message = await this.messagesService.create(createMessageDto);
        this.server.emit("message", message);

        return message;
    }

    @SubscribeMessage("findAllMessages")
    findAll() {
        return this.messagesService.findAll();
    }

    @SubscribeMessage("typing")
    async typing(@MessageBody("isTyping") isTyping: boolean) {
        // To implement typing indicator i have next idea #1:
        // 1. We need to implement an idea about clients: Socket[] array.
        // 2. Also create users array ({ userUid: string, chatUId: string }).
        // 3. Next we should pass smth like curentChatUid to typing event.
        // 4. Thus we can get current online users (sockets) from clients array (by currentChatUid) and send typing event to them.

        // Idea #2:
        // 1. When user typing, he use "typing" event to send it to current chat.
        // 2. Other users that are online in current chat should get this event.

        // Other Idea
        // Create a function sendToChat that will send event to all online users in chat by finding clients by currentChatId.
    }

    // @SubscribeMessage("updateMessage")
    // update(@MessageBody() updateMessageDto: UpdateMessageDto) {
    //     return this.messagesService.update(
    //         updateMessageDto.id,
    //         updateMessageDto
    //     );
    // }

    // @SubscribeMessage("removeMessage")
    // remove(@MessageBody() id: number) {
    //     return this.messagesService.remove(id);
    // }
}
