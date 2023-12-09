import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signupDto } from '../dto/signup.dto';
import { logindto } from 'src/dto/login.dto';

@Controller('auth')
export class AuthController {
        constructor(private authService:AuthService){}

        @Post('signUp')
        async register(@Body()payload:signupDto){
            return await this.authService.signUp(payload);
        }

        @Post('login')
        async login(@Body()payload: logindto){
            return await this.authService.signIn(payload);
        }
}
