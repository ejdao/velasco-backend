import { BadRequestException, Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommonGuards } from '@common/presentation/decorators';
import { AddProductoStockDto } from '../../application/dtos';
import { AddStockToProductoImpl } from '../../infrastructure/services';

@ApiTags('V1 | Productos (stock)')
@CommonGuards()
@Controller('v1/alquiler-maquinaria/productos/stock')
export class ProductosStockController {
  constructor(private readonly _addStockToProducto: AddStockToProductoImpl) {}

  @ApiOkResponse({ type: Boolean })
  @Post('agregar')
  public async addStock(@Body() body: AddProductoStockDto): Promise<boolean> {
    try {
      return await this._addStockToProducto.execute(body);
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }
}
