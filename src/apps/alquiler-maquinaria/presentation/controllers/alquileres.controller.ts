import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommonGuards } from '@common/presentation/decorators';
import { CreateAlquilerDto } from '../../application/dtos';
import { RegistrarAlquilerImpl } from '../../infrastructure/services';

@ApiTags('V1 | Alquileres')
@CommonGuards()
@Controller('v1/alquiler-maquinaria')
export class AlquileresController {
  constructor(private readonly _registrarAlquiler: RegistrarAlquilerImpl) {}

  @ApiOkResponse({ type: Boolean })
  @Post()
  public async create(@Body() body: CreateAlquilerDto): Promise<boolean> {
    try {
      return await this._registrarAlquiler.execute(body);
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }
}
