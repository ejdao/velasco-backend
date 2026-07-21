import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommonGuards } from '@common/presentation/decorators';
import { ESTADO_OBRA_VALUES, EstadoObraType } from '@ctypes/general/obra';
import {
  CATEGORIA_PRODUCTO_VALUES,
  CategoriaProductoType,
} from '@ctypes/alquiler-maquinaria/producto';
import { BadRequestException, Controller, Get } from '@nestjs/common';
import { CtmTypeRes } from '@common/domain/types';

@ApiTags('V1 | Recursos')
@CommonGuards()
@Controller('v1/alquiler-maquinaria/recursos')
export class RecursosController {
  @ApiOkResponse({ type: CtmTypeRes, isArray: true })
  @Get('obras/tipos')
  public async estadosObra(): Promise<EstadoObraType[]> {
    try {
      return ESTADO_OBRA_VALUES;
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOkResponse({ type: CtmTypeRes, isArray: true })
  @Get('productos/categorias')
  public async categoriasProducto(): Promise<CategoriaProductoType[]> {
    try {
      return CATEGORIA_PRODUCTO_VALUES;
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }
}
