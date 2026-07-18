import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommonGuards } from '@common/presentation/decorators';
import { BadRequestException, Controller, Get } from '@nestjs/common';
import { ClientesCrudSource } from '@general/infrastructure/repositories';
import { FetchClienteRes } from '@general/application/responses';

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
}
