import { Role } from "src/enum/role";
import { Product } from "src/product/entities/product.entity";
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    role: Role;
    created_At: Date;
    product: Product[];
}
