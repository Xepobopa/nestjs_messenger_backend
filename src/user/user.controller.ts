import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("")
    public create(@Body() user: CreateUserDto) {
        return this.userService.create(user);
    }

    @Get(":uuid")
    public findOne(@Param("uuid") userId: string) {
        return this.userService.findOneById(userId);
    }
}
