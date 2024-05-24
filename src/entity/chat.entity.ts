import { Column, Entity, ManyToMany, OneToOne } from "typeorm";
import { EChatTypes } from "../enum/chat-types.enum";
import { AbstractEntity } from "./abstract.entity";
import { MessageEntity } from "./message.entity";
import { UserEntity } from "./user.entity";

@Entity("chat")
export class ChatEntity extends AbstractEntity {
    @Column()
    title: string;

    @Column("enum", { enum: EChatTypes })
    type: EChatTypes;

    @Column()
    photo_url: string;

    @ManyToMany(() => UserEntity, (user) => user.chats)
    members: UserEntity[];

    @OneToOne(() => MessageEntity, { nullable: true })
    last_message: MessageEntity;
}
