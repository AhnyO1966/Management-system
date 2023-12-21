import { User } from "src/entity/user.entity";
export declare class Product {
    id: number;
    Name: string;
    Color: string;
    Weight: number;
    Price: number;
    created_At: Date;
    userId: number;
    user: User;
}
