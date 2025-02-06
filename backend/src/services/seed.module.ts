import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { ProductsModule } from '../products/products.module';
import { BrandsModule } from '../brands/brands.module';
import { Product } from '../products/entities/product.entity';
import { Brand } from '../brands/entities/brand.entity';
import { Category } from '../categories/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Brand, Category]),
    ProductsModule,
    BrandsModule,
  ],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
