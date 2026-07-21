import { CtmTypeRes } from '@common/domain/types';
import { ApiProperty } from '@nestjs/swagger';
import { RecursoRes } from '@shared/common';

class ResponsableTerceroRes {
  @ApiProperty()
  id!: number;

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

  @ApiProperty({ example: 'string | null' })
  email!: string;

  @ApiProperty({ example: 'string | null' })
  telefono1!: string;

  @ApiProperty({ example: 'string | null' })
  telefono2!: string;
}

export class FetchTerceroRes {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  nit!: string;

  @ApiProperty()
  nombre!: string;

  @ApiProperty({ example: 'string | null' })
  direccion!: string;

  @ApiProperty({ type: CtmTypeRes })
  estado!: CtmTypeRes;

  @ApiProperty({ type: CtmTypeRes })
  tipo!: CtmTypeRes;

  @ApiProperty({ type: CtmTypeRes })
  tipoPersona!: CtmTypeRes;

  @ApiProperty({ type: RecursoRes })
  municipio!: RecursoRes;

  @ApiProperty({ type: ResponsableTerceroRes, isArray: true })
  responsables!: ResponsableTerceroRes[];
}
