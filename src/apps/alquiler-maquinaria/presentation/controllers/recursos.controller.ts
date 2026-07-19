import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommonGuards } from '@common/presentation/decorators';
import { ESTADO_OBRA_VALUES, EstadoObraType } from '@ctypes/general/obra';
import { BadRequestException, Controller, Get } from '@nestjs/common';
import { CtmTypeRes } from '@common/domain/types';
import { RecursoRes } from '@shared/common';
import { RecursosSource } from '../../infrastructure/repositories';

@ApiTags('V1 | Recursos')
@CommonGuards()
@Controller('v1/alquiler-maquinaria/recursos')
export class RecursosController {
  constructor(private readonly _source: RecursosSource) {}

  @ApiOkResponse({ type: CtmTypeRes, isArray: true })
  @Get('obras/tipos')
  public async estadosObra(): Promise<EstadoObraType[]> {
    try {
      return ESTADO_OBRA_VALUES;
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOkResponse({ type: RecursoRes, isArray: true })
  @Get('productos/categorias')
  public async categoriasProducto(): Promise<RecursoRes[]> {
    try {
      return await this._source.fetchCategoriasProducto();
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }
}
