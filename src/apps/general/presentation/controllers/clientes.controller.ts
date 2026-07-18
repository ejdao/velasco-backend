import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommonGuards } from '@common/presentation/decorators';
import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { ClientesCrudSource } from '@general/infrastructure/repositories';
import { FetchClienteRes } from '@general/application/responses';
import { CreateClienteDto } from '@general/application/dtos';

@ApiTags('V1 | Clientes')
@CommonGuards()
@Controller('v1/general/clientes')
export class ClientesController {
  constructor(private readonly _crud: ClientesCrudSource) {}

  @ApiOkResponse({ type: FetchClienteRes, isArray: true })
  @Get()
  public async fetch(): Promise<FetchClienteRes[]> {
    try {
      return await this._crud.fetch();
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOkResponse({ type: Boolean })
  @Post()
  public async create(@Body() body: CreateClienteDto): Promise<boolean> {
    try {
      return await this._crud.create(body);
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }
}
