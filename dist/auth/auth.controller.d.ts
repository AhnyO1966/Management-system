import { AuthService } from './auth.service';
import { signupDto } from '../dto/signup.Dto';
import { loginDto } from 'src/dto/login.Dto';
import { Response } from 'express';
import { User } from 'src/entity/user.entity';
import { Role } from 'src/enum/role';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(payload: signupDto): Promise<{
        firstName: string;
        lastName: string;
        username: string;
        role: Role;
        email: string;
        password: string;
    } & User>;
    login(payload: loginDto, res: Response): Promise<Response<any, Record<string, any>>>;
    logout(payload: any, res: Response): Promise<void>;
    findUser(): Promise<User[]>;
}
