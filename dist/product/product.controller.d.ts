import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Request } from 'express';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    createProduct(payload: CreateProductDto, req: Request): Promise<import("./entities/product.entity").Product>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateProductDto: UpdateProductDto): string;
    remove(id: string): string;
}
