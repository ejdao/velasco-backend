import { ApiProperty } from '@nestjs/swagger';
import { CtmTypeRes } from '@common/domain/types';
import { RecursoRes } from '@shared/common';

export class LoginRes {
  @ApiProperty()
  token!: string;
}

export class FetchEnterprisesRes {
  @ApiProperty()
  codigo!: string;

  @ApiProperty()
  nombre!: string;
}

export class MyAuthDataRes {
  @ApiProperty()
  documento!: string;

  @ApiProperty()
  nombreCompleto!: string;

  @ApiProperty()
  permisos!: string[];
}

export class MyEmpresaRes {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  codigo!: string;

  @ApiProperty()
  documento!: string;

  @ApiProperty({ type: CtmTypeRes })
  tipo!: CtmTypeRes;

  @ApiProperty()
  nombre!: string;

  @ApiProperty({ type: RecursoRes })
  municipio!: RecursoRes;

  @ApiProperty()
  direccion!: string;
}
