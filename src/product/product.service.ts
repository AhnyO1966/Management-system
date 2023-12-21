import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product)
  private readonly productRepo:Repository<Product>){}


  async createProduct(payload: CreateProductDto, user:User) {
    const product = new Product();
    product.userId = user.id; //instatiating
    Object.assign(product, payload);
    this.productRepo.create(product);
    return await this.productRepo.save(product)
  
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
