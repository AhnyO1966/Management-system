import { AuthService } from './auth.service';
import { userDto } from 'src/dto/user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(payload: userDto): Promise<{
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    } & import("../entity/user.entity").User>;
}
