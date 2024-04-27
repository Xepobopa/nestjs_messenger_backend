import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmAsyncConfig } from "./config/typeorm.config";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";
import { TokenModule } from "./token/token.module";
import { UserModule } from "./user/user.module";
import { AppGateway } from "./app.gateway";
import { AuthorizationModule } from "./auth/authorization.module";
import { FilesUploadS3Module } from "./files-upload-s3/files-upload-s3.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                PORT: Joi.number().required().default(5000),
                DB_HOST: Joi.string().required(),
                DB_PORT: Joi.number().required().default(5432),
                DB_USERNAME: Joi.string().required().default("postgres"),
                DB_PASSWORD: Joi.string().required(),
                DB_DATABASE_NAME: Joi.string().required().default("postgres"),
                SECRET: Joi.string().required().min(10),
                JWT_EXPIRES_IN: Joi.string().required().default("5m"),
            }),
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
        FilesUploadS3Module,
        AuthorizationModule,
        TokenModule,
        UserModule,
        AppGateway,
    ],
})
export class AppModule {}
