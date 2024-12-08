import { Injectable, OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { Brand } from '../brands/entities/brand.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  async onModuleInit() {
    const count = await this.productRepository.count();
    if (count > 0) {
      console.log('Los datos iniciales ya están cargados.');
      return;
    }

    const brands = [
      { name: 'Brand 1' },
      { name: 'Brand 2' },
      { name: 'Brand 3' },
      { name: 'Brand 4' },
      { name: 'Brand 5' },
    ];

    const products = [
      {
        name: 'Producto 1',
        description: 'Descripción del producto 1',
        price: 100,
        stock: 10,
        brand: brands[0],
      },
      {
        name: 'Producto 2',
        description: 'Descripción del producto 2',
        price: 200,
        stock: 20,
        brand: brands[1],
      },
      {
        name: 'Producto 3',
        description: 'Descripción del producto 3',
        price: 300,
        stock: 30,
        brand: brands[2],
      },
      {
        name: 'Producto 4',
        description: 'Descripción del producto 4',
        price: 400,
        stock: 40,
        brand: brands[0],
      },
      {
        name: 'Producto 5',
        description: 'Descripción del producto 5',
        price: 500,
        stock: 50,
        brand: brands[4],
      },
      {
        name: 'Producto 6',
        description: 'Descripción del producto 6',
        price: 600,
        stock: 60,
        brand: brands[2],
      },
      {
        name: 'Producto 7',
        description: 'Descripción del producto 7',
        price: 700,
        stock: 70,
        brand: brands[3],
      },
      {
        name: 'Producto 8',
        description: 'Descripción del producto 8',
        price: 800,
        stock: 80,
        brand: brands[3],
      },
      {
        name: 'Producto 9',
        description: 'Descripción del producto 9',
        price: 900,
        stock: 90,
        brand: brands[4],
      },
      {
        name: 'Producto 10',
        description: 'Descripción del producto 10',
        price: 1000,
        stock: 100,
        brand: brands[1],
      },
    ];

    await this.brandRepository.save(brands);
    await this.productRepository.save(products);
  }
}
