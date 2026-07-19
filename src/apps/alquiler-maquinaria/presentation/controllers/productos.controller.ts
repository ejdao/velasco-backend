import { BadRequestException, Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { CommonGuards } from '@common/presentation/decorators';
import { CreateProductoDto, UpdateProductoDto } from '../../application/dtos';
import { ProductosCrudSource } from '../../infrastructure/repositories';

@ApiTags('V1 | Productos')
@CommonGuards()
@Controller('v1/alquiler-maquinaria/productos')
export class ProductosController {
  constructor(private readonly _crud: ProductosCrudSource) {}

  @ApiOkResponse({ type: Boolean })
  @Post()
  public async create(@Body() body: CreateProductoDto): Promise<boolean> {
    try {
      return await this._crud.create(body);
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOkResponse({ type: Boolean })
  @ApiParam({ name: 'id', required: true, type: String })
  @Put(':id')
  public async update(@Param('id') id: string, @Body() body: UpdateProductoDto): Promise<boolean> {
    try {
      return await this._crud.update(id, body);
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }
}
