import { Module } from "@nestjs/common";
import { TokenModule } from "../token/token.module";
import { UserModule } from "../user/user.module";
import { AuthorizationController } from "./authorization.controller";
import { AuthorizationService } from "./authorization.service";
import { FilesUploadS3Module } from "src/files-upload-s3/files-upload-s3.module";

@Module({
    imports: [UserModule, TokenModule, FilesUploadS3Module],
    controllers: [AuthorizationController],
    providers: [AuthorizationService],
    exports: [AuthorizationModule],
})
export class AuthorizationModule {}
