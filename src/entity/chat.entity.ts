import { Column, ManyToMany, OneToOne } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { EChatTypes } from "../enum/chat-types.enum";
import { MessageEntity } from "./message.entity";
import { UserEntity } from "./user.entity";

export class ChatEntity extends AbstractEntity {
    @Column()
    title: string;

    @Column("enum")
    type: EChatTypes;

    @Column()
    photo_url: string;

    @ManyToMany(() => UserEntity, (user) => user.chats)
    members: UserEntity[];

    @OneToOne(() => MessageEntity)
    last_message: MessageEntity;
}
