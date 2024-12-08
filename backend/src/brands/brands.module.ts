import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { Brand } from './entities/brand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Brand])], // Solo importa lo necesario
  controllers: [BrandsController],
  providers: [BrandsService], // Elimina SeedService de aquí
  exports: [TypeOrmModule], // Exporta para que otros módulos puedan usar BrandRepository
})
export class BrandsModule {}
