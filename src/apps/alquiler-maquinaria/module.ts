import { Module } from '@nestjs/common';
import { ObrasCrudSource, ProductosCrudSource } from './infrastructure/repositories';
import {
  ObrasController,
  ProductosController,
  ProductosStockController,
} from './presentation/controllers';
import { RecursosController } from './presentation/controllers';
import { AddStockToProductoImpl } from './infrastructure/services';

@Module({
  controllers: [ObrasController, ProductosController, ProductosStockController, RecursosController],
  providers: [ObrasCrudSource, ProductosCrudSource, AddStockToProductoImpl],
})
export class AlquMaquModule {}
