import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import {
  CATEGORIA_PRODUCTO,
  type CategoriaProductoCode,
} from '@ctypes/alquiler-maquinaria/producto';

export class CreateProductoDto {
  @ApiProperty()
  @IsString()
  codigo!: string;

  @ApiProperty()
  @IsString()
  nombre!: string;

  @ApiProperty({ example: 'string (opcional)' })
  @IsString()
  @IsOptional()
  descripcion!: string;

  @ApiProperty({ example: CATEGORIA_PRODUCTO.ESTRUCTURAS.getCode() })
  @IsNumber()
  categoriaCode!: CategoriaProductoCode;

  @ApiProperty({ example: 0, required: false })
  @IsNumber()
  @IsOptional()
  valorTarifa!: number;
}

export class UpdateProductoDto extends PartialType(CreateProductoDto) {}

export class AddProductoStockDto {
  @ApiProperty()
  @IsNumber()
  productoId!: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  cantidad!: number;
}
