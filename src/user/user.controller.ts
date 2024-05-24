import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("")
    public create(@Body() user: CreateUserDto) {
        return this.userService.create(user);
    }

    @Get()
    public findOneByToken(@Req() req: Request) {
        console.log(req.headers);
        const token = req.headers["authorization"].split(" ")[1];
        return this.userService.findOneByToken(token);
    }

    @Get("/findAll")
    public findAll() {
        return this.userService.findAll();
    }

    @Get(":uuid")
    public findOne(@Param("uuid") userId: string) {
        return this.userService.findOneById(userId);
    }

    @Get("/getWithChats/:uuid")
    public findOneWithChats(@Param("uuid") userId: string) {
        return this.userService.findOneWithChats(userId);
    }
}
