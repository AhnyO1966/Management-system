import { AuthService } from './auth.service';
import { signupDto } from '../dto/signup.dto';
import { loginDto } from '../dto/login.dto';
import { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(payload: signupDto): Promise<{
        firstName: string;
        lastName: string;
        username: string;
        role: import("../enum/role").Role;
        email: string;
        password: string;
    } & import("../entity/user.entity").User>;
    login(payload: loginDto, res: Response): Promise<Response<any, Record<string, any>>>;
    logout(payload: any, res: Response): Promise<void>;
    findUser(): Promise<import("../entity/user.entity").User[]>;
}
