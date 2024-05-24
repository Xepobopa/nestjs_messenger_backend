import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/entity/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { EUserStatus } from "src/enum/user-status.enum";
import { hash } from "bcrypt";
import { TokenService } from "src/token/token.service";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private readonly tokenService: TokenService
    ) {}

    public createEntity(user: CreateUserDto) {
        return this.userRepository.create({
            ...user,
            status: EUserStatus.OFFLINE,
            chats: [],
        });
    }

    public findOneByToken(token: string) {
        const tokenPayload = this.tokenService.verifyToken(token);
        return this.userRepository.findOneBy({ uuid: tokenPayload.uuid });
    }

    public async create(user: CreateUserDto) {
        console.log("User => ", user);
        return await this.userRepository.save({
            ...user,
            is_activated: false,
            status: EUserStatus.OFFLINE,
            password: await hash(user.password, 10),
            chats: [],
        });
    }

    public async findAll() {
        return this.userRepository.find();
    }

    public async save(user: UserEntity) {
        return await this.userRepository.save(user);
    }

    public async findOneById(userUuid: string) {
        return await this.userRepository.findOneByOrFail({ uuid: userUuid });
    }

    public async findOneWithChats(userUuid: string) {
        return await this.userRepository.findOne({
            where: { uuid: userUuid },
            relations: ["chats"],
        });
    }

    public async findOneNoError(userUuid: string) {
        return await this.userRepository.findOneBy({ uuid: userUuid });
    }

    public async findOneNoErrorWithChats(userUuid: string) {
        return await this.userRepository.findOne({
            where: { uuid: userUuid },
            relations: ["chats"],
        });
    }

    public async findOneByUserName(username: string) {
        return await this.userRepository.findOneByOrFail({ username });
    }
}
