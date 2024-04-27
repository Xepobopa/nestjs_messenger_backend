import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { UserEntity } from "./user.entity";
import { ChatEntity } from "./chat.entity";

@Entity("message")
export class MessageEntity extends AbstractEntity {
    @Column()
    public text: string;

    @ManyToOne(() => UserEntity, (user) => user.id)
    @JoinColumn({ name: "user_id" })
    public sender: UserEntity;

    @ManyToOne(() => ChatEntity, (chat) => chat.id)
    @JoinColumn({ name: "chat_id" })
    public chat: ChatEntity;

    @Column("timestamp")
    public edit_date: Date;
}
