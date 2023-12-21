import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Product } from './entities/product.entity';
import { User } from 'src/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, User]),
    AuthModule
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
