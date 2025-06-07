import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  name: string;

  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La descripción es requerida' })
  description: string;

  @IsNotEmpty({ message: 'El ID de la marca es requerido' })
  brandId: number | string;

  @IsNotEmpty({ message: 'El ID de la categoría es requerido' })
  categoryId: number | string;

  @IsNotEmpty({ message: 'El precio es requerido' })
  price: number | string;

  @IsNotEmpty({ message: 'El stock es requerido' })
  stock: number | string;

  @IsOptional()
  @IsString({ message: 'La URL de la imagen debe ser una cadena de texto' })
  imageUrl?: string;
}
