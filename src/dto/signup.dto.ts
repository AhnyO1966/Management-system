import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Role } from "src/enum/role";

export class signupDto{
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsString()
    @MinLength(6, {message: 'sorry you must put in 6 characters'})
    @MaxLength(16, {message: 'sorry password higher than 16 characters'})
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
    {message: 'password must contain at least one Uppercase, one number and one special key'})
    password: string;

    @IsOptional()
    role:Role
}