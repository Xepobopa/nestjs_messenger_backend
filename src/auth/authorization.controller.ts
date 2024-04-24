import {
    Body,
    Controller,
    HttpStatus,
    Post,
    Res,
    UnauthorizedException,
} from "@nestjs/common";
import { isUndefined } from "@nestjs/common/utils/shared.utils";
import { Request, Response } from "express";
import { AuthorizationService } from "./authorization.service";
import { SignInDto } from "./dto/sign-in.dto";
import { SignUpDto } from "./dto/sign-up.dto";

@Controller("auth")
export class AuthorizationController {
    private readonly cookieName: string;

    constructor(private readonly authorizationService: AuthorizationService) {
        this.cookieName = "token";
    }

    @Post("/sign-up")
    public async singUp(@Body() signUpDto: SignUpDto) {
        console.log("[INFO] signUp!");
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
            secure: true,
            httpOnly: true,
            expires: new Date(Date.now() + 1000), // expires in 1 minute
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
