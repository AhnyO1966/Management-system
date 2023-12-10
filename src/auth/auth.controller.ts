import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signupDto } from '../dto/signup.dto';
import { loginDto } from 'src/dto/login.Dto';
import {Response} from 'express';

@Controller('auth')
export class AuthController {
        constructor(private authService:AuthService){}

        @Post('signUp')
        async signup(@Body()payload:signupDto){
            return await this.authService.signUp(payload);
        }

        @Post('login')
        async login(@Body()payload: loginDto, @Res()res:Response){
            const token = await this.authService.signIn(payload);

            res.cookie('user isAuthenticated', token, {
                httpOnly: true,
                maxAge: 1 * 60 * 60 * 24 
            });
            return res.send({
                StatusCode: 201,
                success: true,
                userToken: token
            })
        }
}
