import { Category } from 'src/categories/entities/category.entity';
import { Brand } from '../../brands/entities/brand.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  stock: number;

  @Column({ nullable: true })
  imageUrl: string;

  @ManyToOne(() => Brand, (brand) => brand.products, { eager: true })
  brand: Brand;

  @ManyToOne(() => Category, (category) => category.products, { eager: true })
  category: Category;
}
