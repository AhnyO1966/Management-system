import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { signupDto } from '../dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { loginDto } from '../dto/login.dto';
export declare class AuthService {
    private userRepository;
    private jwtService;
    authRepo: any;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    signUp(payload: signupDto): Promise<{
        firstName: string;
        lastName: string;
        username: string;
        role: import("../enum/role").Role;
        email: string;
        password: string;
    } & User>;
    signIn(payload: loginDto): Promise<{
        token: string;
    }>;
    findEmail(email: string): Promise<User>;
    findAllUser(): Promise<User[]>;
    User(headers: any): Promise<any>;
}
