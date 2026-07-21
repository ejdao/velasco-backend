import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CommonGuards } from '@common/presentation/decorators';
import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import {
  TIPOS_PERSONA_TERCERO_VALUES,
  TIPOS_TERCERO_VALUES,
  TipoPersonaTerceroType,
  TipoTerceroType,
} from '@ctypes/general/tercero';
import { CtmTypeRes } from '@common/domain/types';
import { RecursoRes } from '@shared/common';
import { RecursosSource } from '@general/infrastructure/repositories';

@ApiTags('V1 | Recursos')
@CommonGuards()
@Controller('v1/general/recursos')
export class RecursosController {
  constructor(private readonly _source: RecursosSource) {}

  @ApiOkResponse({ type: CtmTypeRes, isArray: true })
  @Get('terceros/tipos-entidad')
  public async tiposPersonaTercero(): Promise<TipoPersonaTerceroType[]> {
    try {
      return TIPOS_PERSONA_TERCERO_VALUES;
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOkResponse({ type: CtmTypeRes, isArray: true })
  @Get('terceros/tipos')
  public async tiposTercero(): Promise<TipoTerceroType[]> {
    try {
      return TIPOS_TERCERO_VALUES;
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOkResponse({ type: RecursoRes, isArray: true })
  @ApiQuery({ name: 'pattern', required: false, type: String })
  @Get('terceros')
  public async fetchTerceros(@Query('pattern') pattern: string): Promise<RecursoRes[]> {
    try {
      return await this._source.fetchTerceros(pattern);
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }
}
