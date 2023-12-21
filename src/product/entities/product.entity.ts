import { User } from "src/entity/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'product'})
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Name: string;

    @Column()
    Color: string;

    @Column()
    Weight: number;

    @Column()
    Price: number;

    @CreateDateColumn()
    created_At: Date;

    @Column()
    userId: number

    @ManyToOne(() => User, (user)=>
    user.product, {
        eager: true
    })

    @JoinColumn({
        name: 'userId',
        referencedColumnName: 'id'
    })
    user: User;
}
