
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

  @ManyToOne(() => Brand, (brand) => brand.products, { eager: true }) // Carga automática de Brand
  brand: Brand; // Esto debería ser un objeto, no un ID
}
