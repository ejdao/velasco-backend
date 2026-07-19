import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateObraDto {
  @ApiProperty()
  @IsString()
  nombre!: string;

  @ApiProperty()
  @IsNumber()
  terceroId!: number;

  @ApiProperty()
  @IsNumber()
  municipioId!: number;

  @ApiProperty()
  @IsString()
  direccion!: string;

  @ApiProperty({ example: 'string (opcional)' })
  @IsString()
  @IsOptional()
  notas!: string;
}

export class UpdateObraDto extends PartialType(CreateObraDto) {}
