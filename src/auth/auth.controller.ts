import { Body, Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signupDto } from '../dto/signup.dto';
import { loginDto } from '../dto/login.dto';
import {Response} from 'express';
// import { send } from 'process';
// import { User } from 'src/entity/user.entity';
import { AuthGuard, IAuthGuard, Type } from '@nestjs/passport';
// import { Role } from 'src/enum/role';
import { Roles } from './guard/role';
import { RolesGuard } from './guard/role.guard';

@Controller('auth')
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

        @Post('logout')
        async logout(@Body()payload, @Res()res:Response){

            const token = await this.authService.signIn(payload);;
            res.clearCookie('isAuthenticated');

                res.send('logged out successfully')
            }

            @Get('get')
            @UseGuards(AuthGuard(), RolesGuard)
            @Roles('admin','customer')
            async findUser(){
                return await this.authService.findAllUser()
            }
        }




// function clearCookie() {
//     throw new Error('logout failed');
// }

