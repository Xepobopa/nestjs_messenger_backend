import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    WebSocketGateway,
    WebSocketServer,
} from "@nestjs/websockets";
import { Socket, Server } from "socket.io";

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
export class AppGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
    constructor() {}

    @WebSocketServer() io: Server;

    afterInit() {
        console.log("Socket connection init!");
    }

    handleConnection(client: Socket) {
        const { sockets } = this.io.sockets;

        console.log(`Client (${client.id}) connected!`);
        console.log("Number of connected clients: ", sockets.size);
    }

    handleDisconnect(client: Socket) {
        const { sockets } = this.io.sockets;

        console.log(`Client ${client.id} disconnected!`);
        console.log("Number of connected clients: ", sockets.size);
    }
}
