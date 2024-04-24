import { Module } from "@nestjs/common";
import { TokenModule } from "../token/token.module";
import { UserModule } from "../user/user.module";
import { AuthorizationController } from "./authorization.controller";
import { AuthorizationService } from "./authorization.service";

@Module({
    imports: [UserModule, TokenModule],
    controllers: [AuthorizationController],
    providers: [AuthorizationService],
    exports: [AuthorizationModule],
})
export class AuthorizationModule {}
