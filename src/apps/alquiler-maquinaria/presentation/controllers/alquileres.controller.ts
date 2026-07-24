import { BadRequestException, Body, Controller, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { CommonGuards } from '@common/presentation/decorators';
import { CreateAlquilerCorteDto, CreateAlquilerDto } from '../../application/dtos';
import { RegistrarAlquilerImpl, RegistrarCorteAlquilerImpl } from '../../infrastructure/services';

@ApiTags('V1 | Alquileres')
@CommonGuards()
@Controller('v1/alquiler-maquinaria')
export class AlquileresController {
  constructor(
    private readonly _registrarAlquiler: RegistrarAlquilerImpl,
    private readonly _registrarCorteAlquiler: RegistrarCorteAlquilerImpl
  ) {}

  @ApiOkResponse({ type: Boolean })
  @Post()
  public async create(@Body() body: CreateAlquilerDto): Promise<boolean> {
    try {
      return await this._registrarAlquiler.execute(body);
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOkResponse({ type: Boolean })
  @ApiParam({ name: 'id', required: true, type: String })
  @Post(':id/cortes')
  public async createCorte(
    @Param('id') id: number,
    @Body() body: CreateAlquilerCorteDto
  ): Promise<boolean> {
    try {
      return await this._registrarCorteAlquiler.execute(+id, body);
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }
}
