import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { signupDto } from '../dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { logindto } from 'src/dto/login.dto';
@Injectable()
export class AuthService {
    authRepo: any;
    constructor(@InjectRepository(User) private userRepository:Repository<User>, private jwtService:JwtService){}//setting the database Repository

    async signUp(payload:signupDto){
        const { email, password, ...rest}=payload;
        // destructuring properties

        const userEmail = await this.userRepository.findOne({where:{email:email}});
        // check if email exist

        if(userEmail){
            throw new HttpException('sorry user with this email already exist', 404);
            // throw message if email exist
        }

        const hashPassword = await bcrypt.hash(password, 12);
    // hashing password using bcrypt
        const user = await this.userRepository.save({
         email, password:hashPassword, ...rest})
        // saving data including the hashed password to the database

        delete user.password;  // delete returned password
        return user;
    }

    async signIn(payload:logindto){
        const {email, password}=payload;

        const user = await this.authRepo.findOne({where:{email:email}});
        if(!user){
            throw new HttpException('invalid credentials', 400);
   
        }

        if(!await bcrypt.compare(password, user.password)){
            throw new HttpException('invalid credentials', 400);
        }

        const jwtPayload = {id:user.id, email:user.password}
        const jwtToken = await this.jwtService.signAsync(jwtPayload)

        return {token: jwtToken};
    }

}

