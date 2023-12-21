import { Body, Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signupDto } from '../dto/signup.dto';
import { loginDto } from '../dto/login.dto';
import {Response} from 'express';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from './guard/role';
import { RolesGuard } from './guard/role.guard';
import { SkipThrottle, Throttle } from '@nestjs/throttler';


@Controller('auth')
@SkipThrottle()
export class AuthController {
        constructor(private authService:AuthService){}

        @Post('signUp')
        async signup(@Body()payload:signupDto){
            return await this.authService.signUp(payload);
        }

        @Post('login')
        async login(@Body()payload: loginDto, @Res()res:Response){//ensure you import Response from expressjs
            const token = await this.authService.signIn(payload);
            res.cookie('isAuthenticated', token, {
                httpOnly: true,
                maxAge: 1 * 60 * 60 * 24 
            });
            return res.send({
                StatusCode: 201,
                success: true,
                userToken: token
            })
        }

        @Throttle({ default: { limit: 2, ttl: 60000 } })
        @Post('logout')
        async logout(@Res()res:Response){

            // const token = await this.authService.signIn(payload);;
            res.clearCookie('isAuthenticated');

                res.send('logged out successfully')
            }

         
            @SkipThrottle({default:false})
            @Get('get')
            @UseGuards(AuthGuard(), RolesGuard)
            @Roles('admin','unknown')
            async findUser(){
                return await this.authService.findAllUser()
            }
        }




// function clearCookie() {
//     throw new Error('logout failed');
// }

