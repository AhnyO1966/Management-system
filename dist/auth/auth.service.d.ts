import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { signupDto } from '../dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { logindto } from 'src/dto/login.dto';
export declare class AuthService {
    private userRepository;
    private jwtService;
    authRepo: any;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    signUp(payload: signupDto): Promise<{
        firstName: string;
        lastName: string;
        username: string;
        email: string;
        password: string;
    } & User>;
    signIn(payload: logindto): Promise<{
        token: string;
    }>;
}
