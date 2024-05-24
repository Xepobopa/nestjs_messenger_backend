import { Column, Entity, ManyToMany, JoinTable } from "typeorm";
import { EUserStatus } from "../enum/user-status.enum";
import { AbstractEntity } from "./abstract.entity";
import { ChatEntity } from "./chat.entity";

@Entity("user")
export class UserEntity extends AbstractEntity {
    @Column()
    username: string;

    @Column()
    real_name: string;

    @Column()
    profile_url: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column("enum", { enum: EUserStatus })
    status: EUserStatus;

    @Column()
    password: string;

    @Column("bool", { default: false })
    is_activated: boolean;

    @ManyToMany(() => ChatEntity, (chat) => chat.members)
    @JoinTable()
    chats: ChatEntity[];
}
