import { Injectable, OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { Brand } from '../brands/entities/brand.entity';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async onModuleInit() {
    const count = await this.productRepository.count();
    if (count > 0) {
      return;
    }

    const brands = [
      { name: 'Samsung' },
      { name: 'Philips' },
      { name: 'LG' },
      { name: 'BGH' },
      { name: 'Whirlpool' },
      { name: 'Sony' },
      { name: 'Apple' },
      { name: 'Lenovo' },
      { name: 'HP' },
      { name: 'Dell' },
    ];

    const categories = [
      { name: 'Electrodomésticos' },
      { name: 'Tecnología' },
      { name: 'Computación' },
      { name: 'Audio y Video' },
      { name: 'Telefonía' },
      { name: 'Gaming' },
      { name: 'Climatización' },
      { name: 'Línea Blanca' },
      { name: 'Pequeños Electrodomésticos' },
      { name: 'Accesorios' },
    ];

    const products = [
      {
        name: 'Smart TV Crystal UHD 50 pulgadas',
        description:
          'Smart TV Samsung 50 pulgadas 4K UHD con control remoto único',
        price: 349999,
        stock: 15,
        brand: brands[0],
        category: categories[1],
      },
      {
        name: 'Heladera No Frost',
        description: 'Heladera Whirlpool No Frost 375L color plateado',
        price: 599999,
        stock: 8,
        brand: brands[4],
        category: categories[7],
      },
      {
        name: 'Aire Acondicionado Split',
        description:
          'Aire acondicionado BGH Silent Air 3000 frigorías frío/calor',
        price: 449999,
        stock: 12,
        brand: brands[3],
        category: categories[6],
      },
      {
        name: 'Lavarropas Automático',
        description: 'Lavarropas LG 8.5kg con vapor Steam Wash',
        price: 529999,
        stock: 10,
        brand: brands[2],
        category: categories[7],
      },
      {
        name: 'Smart TV 43 Full HD',
        description: 'Smart TV Philips 43 pulgadas Full HD con Android TV',
        price: 289999,
        stock: 20,
        brand: brands[1],
        category: categories[1],
      },
      {
        name: 'Microondas Digital',
        description: 'Microondas BGH 28L con grill y panel digital',
        price: 159999,
        stock: 25,
        brand: brands[3],
        category: categories[8],
      },
      {
        name: 'Soundbar 2.1',
        description: 'Barra de sonido Samsung con subwoofer inalámbrico',
        price: 179999,
        stock: 15,
        brand: brands[0],
        category: categories[3],
      },
      {
        name: 'Lavavajillas',
        description: 'Lavavajillas Whirlpool 12 cubiertos con 6 programas',
        price: 689999,
        stock: 6,
        brand: brands[4],
        category: categories[7],
      },
      {
        name: 'Monitor Gaming',
        description: 'Monitor LG 27 pulgadas 144Hz 1ms Full HD Gaming',
        price: 259999,
        stock: 18,
        brand: brands[2],
        category: categories[5],
      },
      {
        name: 'Aspiradora Robot',
        description: 'Aspiradora Robot Philips con mapeo y app',
        price: 199999,
        stock: 12,
        brand: brands[1],
        category: categories[8],
      },
      {
        name: 'MacBook Pro 14',
        description: 'Laptop Apple M2 Pro con 16GB RAM y 512GB SSD',
        price: 1299999,
        stock: 8,
        brand: brands[6],
        category: categories[2],
      },
      {
        name: 'PlayStation 5',
        description: 'Consola PS5 con lector de discos y control DualSense',
        price: 599999,
        stock: 10,
        brand: brands[5],
        category: categories[5],
      },
      {
        name: 'ThinkPad X1 Carbon',
        description: 'Laptop Lenovo Intel i7 16GB RAM 512GB SSD',
        price: 899999,
        stock: 7,
        brand: brands[7],
        category: categories[2],
      },
      {
        name: 'iPhone 15 Pro',
        description: 'Smartphone Apple 256GB con cámara triple',
        price: 999999,
        stock: 15,
        brand: brands[6],
        category: categories[4],
      },
      {
        name: 'Galaxy S24 Ultra',
        description: 'Smartphone Samsung 512GB con S Pen incluido',
        price: 899999,
        stock: 12,
        brand: brands[0],
        category: categories[4],
      },
      {
        name: 'Pavilion Gaming Desktop',
        description: 'PC Gaming HP RTX 4060 Intel i5 16GB RAM',
        price: 799999,
        stock: 5,
        brand: brands[8],
        category: categories[5],
      },
      {
        name: 'XPS 15',
        description: 'Laptop Dell 15.6 pulgadas 4K OLED i9',
        price: 1199999,
        stock: 6,
        brand: brands[9],
        category: categories[2],
      },
      {
        name: 'Auriculares WH-1000XM5',
        description: 'Auriculares Sony Bluetooth con cancelación de ruido',
        price: 299999,
        stock: 20,
        brand: brands[5],
        category: categories[3],
      },
      {
        name: 'Smart Watch Series 9',
        description: 'Reloj inteligente Apple con monitor cardíaco',
        price: 399999,
        stock: 25,
        brand: brands[6],
        category: categories[9],
      },
      {
        name: 'Tablet Galaxy Tab S9',
        description: 'Tablet Samsung 12.4 pulgadas 256GB con S Pen',
        price: 699999,
        stock: 10,
        brand: brands[0],
        category: categories[1],
      },
    ];

    await this.categoryRepository.save(categories);
    await this.brandRepository.save(brands);
    await this.productRepository.save(products);
  }
}
