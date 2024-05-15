import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/entity/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { EUserStatus } from "src/enum/user-status.enum";
import { hash } from "bcrypt";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {}

    public async create(user: CreateUserDto) {
        console.log("User => ", user);
        return await this.userRepository.save({
            ...user,
            is_activated: false,
            status: EUserStatus.OFFLINE,
            password: await hash(user.password, 10),
        });
    }

    public async findOneById(userUuid: string) {
        return await this.userRepository.findOneByOrFail({ uuid: userUuid });
    }

    public async findOneNoError(userUuid: string) {
        return await this.userRepository.findOneBy({ uuid: userUuid });
    }

    public async findOneByUserName(username: string) {
        return await this.userRepository.findOneByOrFail({ username });
    }
}
