import { AuthService } from './auth.service';
import { signupDto } from '../dto/signup.dto';
import { logindto } from 'src/dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(payload: signupDto): Promise<{
        firstName: string;
        lastName: string;
        username: string;
        email: string;
        password: string;
    } & import("../entity/user.entity").User>;
    login(payload: logindto): Promise<{
        token: string;
    }>;
}
