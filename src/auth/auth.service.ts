import { HttpException, Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { signupDto } from '../dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
// import { loginDto } from 'src/dto/login.dto';
import { loginDto } from '../dto/login.dto';

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

    async signIn(payload:loginDto){
        const {email, password}=payload;

        const user = await this.userRepository.findOne({where:{email:email}});
        if(!user){
            throw new HttpException('invalid credentials', 400);
   
        }

        if(!await bcrypt.compare(password, user.password)){
            throw new HttpException('invalid credentials', 400);
        }

        const jwtPayload = {id:user.id, email:user.email}
        const jwtToken = await this.jwtService.signAsync(jwtPayload)

        return {token: jwtToken};
    }
     async findEmail(email:string){
        const mail = await this.userRepository.findOneByOrFail({email})
        if(!mail){
            throw new UnauthorizedException()

        }
        return mail;
     }

     async findAllUser(){
        return await this.userRepository.find()
     }

     async User(headers:any) :Promise<any>{
        const authorizationHeader = headers.authorization; 
        if (authorizationHeader) {
        const token = authorizationHeader.replace('Bearer ', ''); 
        const secret = process.env.JWT_SECRET;
        try {
          const decoded = this.jwtService.verify(token); 
          let id =decoded["id"];
          let user= await this.userRepository.findOneBy({id});
          
    return {id,name:user.username,email:user.email,role:user.role};
        } catch (error) {
          throw new UnauthorizedException('Invalid token');
        }
        }else{
            throw new UnauthorizedException('Invalid or missing Bearer token');
        }
    }

    }