import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import {
  TIPOS_PERSONA_TERCERO,
  TIPOS_TERCERO,
  type TipoPersonaTerceroCode,
  type TipoTerceroCode,
} from '@ctypes/general/tercero';

export class CreateTerceroDto {
  @ApiProperty()
  @IsString()
  nit!: string;

  @ApiProperty()
  @IsString()
  nombre!: string;

  @ApiProperty({ example: TIPOS_TERCERO.CLIENTE_PROVEEDOR.getCode() })
  @IsNumber()
  tipoCode!: TipoTerceroCode;

  @ApiProperty({ example: TIPOS_PERSONA_TERCERO.PERSONA_NATURAL.getCode() })
  @IsNumber()
  tipoPersonaCode!: TipoPersonaTerceroCode;

  @ApiProperty()
  @IsNumber()
  municipioId!: number;

  @ApiProperty({ example: 'string (opcional)' })
  @IsString()
  @IsOptional()
  direccion!: string;
}
