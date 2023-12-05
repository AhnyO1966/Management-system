import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { userDto } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private userRepository:Repository<User>){}

    async signUp(payload:userDto){
        const {firstName, lastName, email, password}=payload;
        // destructuring properties

        const userEmail = await this.userRepository.findOne({where:{email:email}});
        // check if email exist

        if(userEmail){
            throw new HttpException('sorry user with this email already exist', 404);
            // throw message if email exist
        }

        const hashPassword = await bcrypt.hash(password, 12);
    // hashing password using bcrypt
        const user = await this.userRepository.save({firstName, 
        lastName, email, password:hashPassword})
        // saving data including the hashed password to the database

        delete user.password;  // delete returned password
        return user;
    }
}

