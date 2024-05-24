import {
    IsEmail,
    IsOptional,
    IsPhoneNumber,
    IsString,
    IsStrongPassword,
    IsUrl,
    Length,
} from "class-validator";

export class SignUpDto {
    @IsString()
    @Length(4, 30)
    public username: string;

    @IsString()
    @Length(4, 128)
    public real_name: string;

    @IsString()
    @IsUrl()
    @IsOptional()
    public profile_url: string;

    @IsString()
    @IsPhoneNumber()
    public phone: string;

    @IsString()
    @IsEmail()
    public email: string;

    @IsString()
    // @IsStrongPassword({
    //     minLength: 7,
    //     minNumbers: 1,
    //     minSymbols: 1,
    //     minUppercase: 1,
    //     minLowercase: 1,
    // })
    public password: string;
}
