import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  name: string;

  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La descripción es requerida' })
  description: string;

  @IsNumber({}, { message: 'El ID de la marca debe ser un número' })
  @IsNotEmpty({ message: 'El ID de la marca es requerido' })
  brandId: number;

  @IsNumber({}, { message: 'El ID de la categoría debe ser un número' })
  @IsNotEmpty({ message: 'El ID de la categoría es requerido' })
  categoryId: number;

  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsNotEmpty({ message: 'El precio es requerido' })
  price: number;

  @IsNumber({}, { message: 'El stock debe ser un número' })
  @IsNotEmpty({ message: 'El stock es requerido' })
  stock: number;
}
