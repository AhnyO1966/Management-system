import { IsNotEmpty, IsString, MinLength, MaxLength, Matches, IsEmail } from "class-validator";

export class logindto{

    @IsNotEmpty()
    @IsEmail()
    email: string;


    @IsNotEmpty()
    @IsString()
    @MinLength(6, {message: 'sorry you must put in 6 characters'})
    @MaxLength(16, {message: 'sorry password higher than 16 characters'})
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
    {message: 'password must contain at least one Uppercase, one number and one special key'})
    password: string;
}