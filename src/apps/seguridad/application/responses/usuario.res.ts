import { CtmTypeRes } from '@common/domain/types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioRes {
  @ApiProperty()
  id!: string;
}

class RolRes {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  nombre!: string;
}

class TerceroResponsableRes {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  nit!: string;

  @ApiProperty()
  nombre!: string;

  @ApiProperty({ example: 'string | null' })
  direccion!: string;
}

export class FetchUsuarioRes {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  documento!: string;

  @ApiProperty()
  primerNombre!: string;

  @ApiProperty({ example: 'string | null' })
  segundoNombre!: string;

  @ApiProperty()
  primerApellido!: string;

  @ApiProperty({ example: 'string | null' })
  segundoApellido!: string;

  @ApiProperty({ example: 'string' })
  nombreCompleto!: string;

  @ApiProperty({ example: 'string | null' })
  numeroContactoPrincipal!: string;

  @ApiProperty({ example: 'string | null' })
  numeroContactoSecundario!: string;

  @ApiProperty({ example: 'string | null' })
  email!: string;

  @ApiProperty()
  ultimoAcceso!: Date;

  @ApiProperty()
  isPasswordReiniciada!: boolean;

  @ApiProperty({ type: RolRes })
  rol!: RolRes;

  @ApiProperty({ type: CtmTypeRes })
  estado!: CtmTypeRes;

  @ApiProperty({ type: CtmTypeRes })
  tipoDocumento!: CtmTypeRes;

  @ApiProperty({ type: TerceroResponsableRes, isArray: true })
  terceros!: TerceroResponsableRes[];
}
