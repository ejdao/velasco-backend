import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

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

  @ApiProperty()
  @IsNumber()
  categoriaId!: number;

  @ApiProperty({ example: 0, required: false })
  @IsNumber()
  @IsOptional()
  valorTarifa!: number;
}

export class UpdateProductoDto extends PartialType(CreateProductoDto) {}
