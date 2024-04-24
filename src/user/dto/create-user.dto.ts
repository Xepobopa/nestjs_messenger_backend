import { IsEmail, IsPhoneNumber, IsString, IsUrl } from "class-validator";

export class CreateUserDto {
    @IsString()
    username: string;

    @IsString()
    real_name: string;

    @IsString()
    @IsUrl()
    profile_url: string;

    @IsString()
    @IsPhoneNumber()
    phone: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}
