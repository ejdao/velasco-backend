import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommonGuards } from '@common/presentation/decorators';
import { BadRequestException, Controller, Get } from '@nestjs/common';
import { TIPOS_TERCERO_VALUES, TipoTerceroType } from '@ctypes/general/tercero';
import { CtmTypeRes } from '@common/domain/types';

@ApiTags('V1 | Recursos')
@CommonGuards()
@Controller('v1/general/recursos')
export class RecursosController {
  @ApiOkResponse({ type: CtmTypeRes, isArray: true })
  @Get('cliente/tipos')
  public async tiposCliente(): Promise<TipoTerceroType[]> {
    try {
      return TIPOS_TERCERO_VALUES;
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }
}
