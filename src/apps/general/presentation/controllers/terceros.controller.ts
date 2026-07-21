import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CommonGuards } from '@common/presentation/decorators';
import { BadRequestException, Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TercerosCrudSource } from '@general/infrastructure/repositories';
import { FetchTerceroRes } from '@general/application/responses';
import { CreateTerceroDto } from '@general/application/dtos';
import { type TipoTerceroCode } from '@ctypes/general/tercero';

@ApiTags('V1 | Terceros')
@CommonGuards()
@Controller('v1/general/terceros')
export class TercerosController {
  constructor(private readonly _crud: TercerosCrudSource) {}

  @ApiOkResponse({ type: FetchTerceroRes, isArray: true })
  @ApiQuery({ name: 'tipoCode', required: true, type: Number })
  @Get()
  public async fetch(@Query('tipoCode') tipoCode: TipoTerceroCode): Promise<FetchTerceroRes[]> {
    try {
      return await this._crud.fetch(tipoCode as any);
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOkResponse({ type: Boolean })
  @Post()
  public async create(@Body() body: CreateTerceroDto): Promise<boolean> {
    try {
      return await this._crud.create(body);
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }
}
