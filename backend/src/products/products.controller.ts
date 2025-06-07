import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

// Tipo para archivos subidos
interface UploadedFileType {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
}
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindAllProductsDto } from './dto/find-all-products.dto';

// Configuración de multer para el almacenamiento de archivos
const multerConfig = {
  storage: diskStorage({
    destination: './uploads/products',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      const filename = `product-${uniqueSuffix}${ext}`;
      callback(null, filename);
    },
  }),
  fileFilter: (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return callback(
        new BadRequestException('Solo se permiten archivos de imagen'),
        false,
      );
    }
    callback(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
};

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(@Query() dto: FindAllProductsDto) {
    return await this.productsService.findAll(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(+id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file?: UploadedFileType,
  ) {
    // Convertir strings a números cuando vienen de form-data
    if (typeof createProductDto.brandId === 'string') {
      createProductDto.brandId = parseInt(createProductDto.brandId, 10);
    }
    if (typeof createProductDto.categoryId === 'string') {
      createProductDto.categoryId = parseInt(createProductDto.categoryId, 10);
    }
    if (typeof createProductDto.price === 'string') {
      createProductDto.price = parseFloat(createProductDto.price);
    }
    if (typeof createProductDto.stock === 'string') {
      createProductDto.stock = parseInt(createProductDto.stock, 10);
    }

    if (file) {
      // Generar la URL relativa para la imagen
      createProductDto.imageUrl = `/uploads/products/${file.filename}`;
    }
    return await this.productsService.create(createProductDto);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() file?: UploadedFileType,
  ) {
    // Convertir strings a números cuando vienen de form-data
    if (updateProductDto.brandId && typeof updateProductDto.brandId === 'string') {
      updateProductDto.brandId = parseInt(updateProductDto.brandId, 10);
    }
    if (updateProductDto.categoryId && typeof updateProductDto.categoryId === 'string') {
      updateProductDto.categoryId = parseInt(updateProductDto.categoryId, 10);
    }
    if (updateProductDto.price && typeof updateProductDto.price === 'string') {
      updateProductDto.price = parseFloat(updateProductDto.price);
    }
    if (updateProductDto.stock && typeof updateProductDto.stock === 'string') {
      updateProductDto.stock = parseInt(updateProductDto.stock, 10);
    }

    if (file) {
      // Generar la URL relativa para la nueva imagen
      updateProductDto.imageUrl = `/uploads/products/${file.filename}`;
    }
    return await this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productsService.remove(+id);
  }
}
