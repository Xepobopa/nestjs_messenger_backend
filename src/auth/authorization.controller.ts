import {
    Body,
    Controller,
    HttpStatus,
    NestInterceptor,
    ParseFilePipeBuilder,
    Post,
    Res,
    UnauthorizedException,
    UploadedFile,
    UseInterceptors,
} from "@nestjs/common";
import { isUndefined } from "@nestjs/common/utils/shared.utils";
import { Request, Response } from "express";
import { AuthorizationService } from "./authorization.service";
import { SignInDto } from "./dto/sign-in.dto";
import { SignUpDto } from "./dto/sign-up.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { FilesUploadS3Service } from "src/files-upload-s3/files-upload-s3.service";
import { v4 } from "uuid";

@Controller("auth")
export class AuthorizationController {
    private readonly cookieName: string;

    constructor(
        private readonly authorizationService: AuthorizationService,
        private readonly filesUploadS3Service: FilesUploadS3Service
    ) {
        this.cookieName = "token";
    }

    @Post("/sign-up")
    @UseInterceptors(FileInterceptor("avatar") as unknown as NestInterceptor)
    public async singUp(
        @Body() signUpDto: SignUpDto,
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({
                    fileType: /(jpg|jpeg|png|gif)$/,
                })
                .addMaxSizeValidator({
                    maxSize: 2 * 1000 * 1000,
                })
                .build({
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                })
        )
        avatar: Express.Multer.File
    ) {
        signUpDto.profile_url =
            await this.filesUploadS3Service.uploadProfilePhoto(
                `${signUpDto.username}/${v4()}.${avatar.mimetype.split("/")[1]}`, // Xepobopa/jasl3-vfk3a-fafo4-opiq3.png
                avatar.buffer
            );
        return this.authorizationService.signUp(signUpDto);
    }

    @Post("/sign-in")
    public async signIn(@Body() singInDto: SignInDto, @Res() res: Response) {
        console.log("[INFO] SignIn!");
        const result = await this.authorizationService.signIn(singInDto);

        this.setTokenCookie(result.token, res)
            .status(HttpStatus.OK)
            .send({ user: result.user });

        console.log({ token: result.token });
    }

    // @Post("/refreshToken")
    // public async refreshToken(@Req() req: Request, @Res() res: Response) {
    //     const oldToken = this.getRefreshToken(req);
    //     const result = await this.authorizationService.refreshToken(oldToken);

    //     this.setRefreshCookie(result.refreshToken, res)
    //         .status(HttpStatus.OK)
    //         .send({ accessToken: result.accessToken, user: result.user });
    // }

    // @Post("/logout")
    // public async logout(@Req() req: Request, @Res() res: Response) {
    //     const token = this.getRefreshToken(req);

    //     await this.authorizationService.logout(token);

    //     res.clearCookie(this.cookieName).status(HttpStatus.OK).send("Success");
    // }

    @Post("/confirm-email")
    public async confirmUserByEmail() {}

    // @Get("cache")
    // public async getAllCache() {
    //     return await this.authorizationService.getAllCache();
    // }

    private setTokenCookie(token: string, res: Response) {
        return res.cookie(this.cookieName, token, {
            // secure: true,
            // httpOnly: true,
        });
    }

    private getTokenCookie(req: Request) {
        const token = req.cookies[this.cookieName];

        if (isUndefined(token) || token === "" || token === null) {
            throw new UnauthorizedException();
        }

        return token;
    }
}
