import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { EUserStatus } from "../enum/user-status.enum";
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

    @ManyToMany(() => ChatEntity)
    @JoinTable({
        name: "chats", // Specifies the table name for the join table
        joinColumn: {
            name: "user_id", // Name of the column in join table for user
            referencedColumnName: "id", // Name of the column in the User table which is referred here
        },
        inverseJoinColumn: {
            name: "chat_id", // Name of the column in join table for chat
            referencedColumnName: "id", // Name of the column in the Chat table which is referred here
        },
    })
    chats: ChatEntity[];
}
