import { BadRequestException, Injectable } from "@nestjs/common";
import { compare } from "bcrypt";
import { TokenService } from "../token/token.service";
import { UserService } from "../user/user.service";
import { SignInDto } from "./dto/sign-in.dto";
import { SignUpDto } from "./dto/sign-up.dto";

@Injectable()
export class AuthorizationService {
    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService
    ) {}

    public async signUp(signUpDto: SignUpDto) {
        console.log("Sign up with data: ", signUpDto);
        const newUser = this.userService.create(signUpDto);
        // this.mailerService.sendConfirmationEmail(newUser);
        return newUser;
    }

    public async signIn(signIn: SignInDto) {
        const user = await this.userService.findOneByUserName(signIn.username);

        if (!(await compare(signIn.password, user.password))) {
            throw new BadRequestException("Password is wrong!", {
                cause: "Password is wrong!",
                description: "Password is wrong!",
            });
        }

        const token = this.tokenService.generateToken({ ...user });
        return { token, user };
    }

    // public async logout(refreshToken: string) {
    //     const { exp, jti, uuid } = this.tokenService.verifyToken(
    //         refreshToken,
    //         "refresh"
    //     );

    //     await this.blackListToken(jti, uuid, exp);
    // }

    // // TODO: Delete in prod
    // public async getAllCache() {
    //     const keys = await this.cacheManager.store.keys();
    //     console.log("KEYS: ", keys);

    //     const res = [];
    //     for (const key in keys) {
    //         res[key] = await this.cacheManager.get(key);
    //     }

    //     return res;
    // }

    // private async blackListToken(tokenId: string, userId: string, exp: number) {
    //     const now = Date.now();
    //     const ttl = exp - now;

    //     if (ttl > 0) {
    //         // set new value
    //         await this.cacheManager.set(
    //             `blacklist:${userId}:${tokenId}`,
    //             now,
    //             ttl
    //         );
    //     }
    // }

    // private async checkIfTokenIsBlackListed(userId: string, tokenId: string) {
    //     const time = await this.cacheManager.get<number>(
    //         `blacklist${userId}:${tokenId}`
    //     );

    //     if (!isUndefined(time)) {
    //         throw new UnauthorizedException("Invalid token");
    //     }
    // }
}
