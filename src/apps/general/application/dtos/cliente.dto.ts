import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { type TipoTerceroCode } from '@ctypes/general/tercero';

export class CreateClienteDto {
  @ApiProperty()
  @IsString()
  nit!: string;

  @ApiProperty()
  @IsString()
  nombre!: string;

  @ApiProperty()
  @IsNumber()
  tipoPersonaCode!: TipoTerceroCode;

  @ApiProperty()
  @IsNumber()
  municipioId!: number;

  @ApiProperty({ example: 'string (opcional)' })
  @IsString()
  @IsOptional()
  direccion!: string;
}
