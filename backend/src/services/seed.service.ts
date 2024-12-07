import { Injectable, OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async onModuleInit() {
    const count = await this.productRepository.count();
    if (count > 0) {
      console.log('Los datos iniciales ya están cargados.');
      return;
    }

    const products = [
      {
        name: 'Producto 1',
        description: 'Descripción del producto 1',
        price: 100,
        stock: 10,
      },
      {
        name: 'Producto 2',
        description: 'Descripción del producto 2',
        price: 200,
        stock: 20,
      },
      {
        name: 'Producto 3',
        description: 'Descripción del producto 3',
        price: 300,
        stock: 30,
      },
      {
        name: 'Producto 4',
        description: 'Descripción del producto 4',
        price: 400,
        stock: 40,
      },
      {
        name: 'Producto 5',
        description: 'Descripción del producto 5',
        price: 500,
        stock: 50,
      },
      {
        name: 'Producto 6',
        description: 'Descripción del producto 6',
        price: 600,
        stock: 60,
      },
      {
        name: 'Producto 7',
        description: 'Descripción del producto 7',
        price: 700,
        stock: 70,
      },
      {
        name: 'Producto 8',
        description: 'Descripción del producto 8',
        price: 800,
        stock: 80,
      },
      {
        name: 'Producto 9',
        description: 'Descripción del producto 9',
        price: 900,
        stock: 90,
      },
      {
        name: 'Producto 10',
        description: 'Descripción del producto 10',
        price: 1000,
        stock: 100,
      },
    ];

    await this.productRepository.save(products);
  }
}
