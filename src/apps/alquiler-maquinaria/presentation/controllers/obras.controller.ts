import { BadRequestException, Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { CommonGuards } from '@common/presentation/decorators';
import { CreateObraDto, UpdateObraDto } from '../../application/dtos';
import { ObrasCrudSource } from '../../infrastructure/repositories';

@ApiTags('V1 | Obras')
@CommonGuards()
@Controller('v1/alquiler-maquinaria/obras')
export class ObrasController {
  constructor(private readonly _crud: ObrasCrudSource) {}

  @ApiOkResponse({ type: Boolean })
  @Post()
  public async create(@Body() body: CreateObraDto): Promise<boolean> {
    try {
      return await this._crud.create(body);
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOkResponse({ type: Boolean })
  @ApiParam({ name: 'id', required: true, type: String })
  @Put(':id')
  public async update(@Param('id') id: string, @Body() body: UpdateObraDto): Promise<boolean> {
    try {
      return await this._crud.update(id, body);
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }
}
