import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import * as usuarioTypes from '@ctypes/general/usuario';

export class CreateUsuarioDto {
  @ApiProperty()
  @IsString()
  rolId!: string;

  @ApiProperty({ example: usuarioTypes.TIPOS_DOCUMENTO.CEDULA_CIUDADANIA.getCode() })
  @IsNumber()
  tipoDocumentoCode!: usuarioTypes.TipoDocUsuarioCode;

  @ApiProperty({ example: usuarioTypes.ESTADO_USUARIO.ACTIVO.getCode() })
  @IsNumber()
  estadoCode!: usuarioTypes.EstadoUsuarioCode;

  @ApiProperty()
  @IsString()
  documento!: string;

  @ApiProperty()
  @IsString()
  primerNombre!: string;

  @ApiProperty({ example: 'string (opcional)' })
  @IsString()
  @IsOptional()
  segundoNombre!: string;

  @ApiProperty()
  @IsString()
  primerApellido!: string;

  @ApiProperty({ example: 'string (opcional)' })
  @IsString()
  @IsOptional()
  segundoApellido!: string;

  @ApiProperty({ example: 'string (opcional)' })
  @IsOptional()
  numeroCelular!: string;

  @ApiProperty({ example: 'string (opcional)' })
  @IsOptional()
  email!: string;
}

export class UpdateUsuarioDto extends CreateUsuarioDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  id!: string;
}
