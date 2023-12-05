import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { userDto } from 'src/dto/user.dto';

@Controller('auth')
export class AuthController {
        constructor(private authService:AuthService){}

        @Post('signUp')
        async register(@Body()payload:userDto){
            return await this.authService.signUp(payload);
        }
}
