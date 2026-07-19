import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ESTADO_OBRA, type EstadoObraCode } from '@ctypes/general/obra';

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

  @ApiProperty({ description: 'Id cifrado del usuario responsable' })
  @IsString()
  responsableId!: string;

  @ApiProperty({ description: 'Id cifrado del usuario vendedor' })
  @IsString()
  vendedorId!: string;

  @ApiProperty({ example: ESTADO_OBRA.PLANEADA.getCode(), required: false })
  @IsNumber()
  @IsOptional()
  estadoCode!: EstadoObraCode;

  @ApiProperty({ example: 'string (opcional)' })
  @IsString()
  @IsOptional()
  notas!: string;
}

export class UpdateObraDto extends PartialType(CreateObraDto) {}
