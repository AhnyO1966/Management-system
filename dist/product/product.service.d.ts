import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';
export declare class ProductService {
    private readonly productRepo;
    constructor(productRepo: Repository<Product>);
    createProduct(payload: CreateProductDto, user: User): Promise<Product>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateProductDto: UpdateProductDto): string;
    remove(id: number): string;
}
