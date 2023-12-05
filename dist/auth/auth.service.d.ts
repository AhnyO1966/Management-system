import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { userDto } from '../dto/user.dto';
export declare class AuthService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    signUp(payload: userDto): Promise<{
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    } & User>;
}
