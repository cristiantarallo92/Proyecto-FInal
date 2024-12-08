import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { ProductsModule } from '../products/products.module';
import { BrandsModule } from '../brands/brands.module';
import { Product } from '../products/entities/product.entity';
import { Brand } from '../brands/entities/brand.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Brand]), // Registra las entidades necesarias
    ProductsModule,
    BrandsModule,
  ],
  providers: [SeedService], // Declara el SeedService aquí
  exports: [SeedService], // Exporta el SeedService si es necesario
})
export class SeedModule {}
