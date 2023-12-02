import { Role } from "src/enum/role";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    firstName: string;

    @Column()
    lastName:string;

    @Column({unique: true})
    email:string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.customer,
    })
    role: Role
    
    

    
    
    
    
    
}