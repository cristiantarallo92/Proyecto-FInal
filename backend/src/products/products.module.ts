import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])], // Solo importa lo necesario
  controllers: [ProductsController],
  providers: [ProductsService], // Elimina SeedService de aquí
  exports: [TypeOrmModule], // Exporta para que otros módulos puedan usar ProductRepository
})
export class ProductsModule {}
