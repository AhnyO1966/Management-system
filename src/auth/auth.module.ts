import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory:async (configService: ConfigService) =>({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          algorithm: configService.getOrThrow('JWT_ALGORITH'),
          expiresIn: configService.getOrThrow('JWT_EXPIRESIN'),
          
        }
      }) ,
      inject: [ConfigService], 
    }),
    PassportModule.registerAsync({
      useFactory: async (configService:ConfigService)=>({
        defaultStrategy:configService.getOrThrow<string>('JWT_NAME')
      }),
      inject: [ConfigService], 

    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports:[JwtStrategy, PassportModule, AuthService]
})
export class AuthModule {}
