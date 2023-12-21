import { Role } from "src/enum/role";
import { Product } from "src/product/entities/product.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName:string;
    @Column()
    username: string

    @Column({unique: true})
    email:string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.unknown,
    })
    role: Role;

    @CreateDateColumn()
    created_At: Date;

    @OneToMany(() => Product, (Product) =>
    Product.user)
    product: Product[];
    
    

    
    
    
    
    
}