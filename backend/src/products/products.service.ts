import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { FindAllProductsDto } from './dto/find-all-products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(dto: FindAllProductsDto): Promise<Product[]> {
    const { quickSearch, categoryId, brandId } = dto;

    const query = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('product.category', 'category');

    if (quickSearch) {
      query.andWhere('product.name ILIKE :quickSearch', {
        quickSearch: `%${quickSearch}%`,
      });
    }

    if (categoryId) {
      query.andWhere('product.categoryId = :categoryId', {
        categoryId,
      });
    }

    if (brandId) {
      query.andWhere('product.brandId = :brandId', {
        brandId,
      });
    }

    return await query.getMany();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }
    return product;
  }

  async create(createProductDto: CreateProductDto) {
    const existingProduct = await this.productRepository
      .createQueryBuilder('product')
      .where('LOWER(product.name) = LOWER(:name)', {
        name: createProductDto.name,
      })
      .getOne();

    if (existingProduct) {
      throw new ConflictException(
        `El producto con nombre "${createProductDto.name}" ya existe`,
      );
    }

    const product = this.productRepository.create({
      ...createProductDto,
      brand: { id: createProductDto.brandId },
      category: { id: createProductDto.categoryId },
    });
    
    const savedProduct = await this.productRepository.save(product);
    return {
      id: savedProduct.id,
      name: savedProduct.name,
      description: savedProduct.description,
      price: savedProduct.price,
      stock: savedProduct.stock,
      brandId: savedProduct.brand.id,
      categoryId: savedProduct.category.id,
    };
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }
    return await this.productRepository.save({
      ...product,
      ...updateProductDto,
    });
  }

  async remove(id: number): Promise<Product> {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }
    await this.productRepository.delete(id);
    return product;
  }
}
