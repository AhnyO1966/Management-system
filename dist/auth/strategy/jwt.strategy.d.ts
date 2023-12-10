import { AuthService } from "../auth.service";
import { Strategy } from 'passport-jwt';
import { User } from "../../entity/user.entity";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(payload: {
        email: any;
    }): Promise<User>;
}
export {};
