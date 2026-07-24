import { Module } from '@nestjs/common';
import { ObrasCrudSource, ProductosCrudSource } from './infrastructure/repositories';
import {
  AlquileresController,
  ObrasController,
  ProductosController,
  ProductosStockController,
} from './presentation/controllers';
import { RecursosController } from './presentation/controllers';
import { AddStockToProductoImpl, RegistrarAlquilerImpl } from './infrastructure/services';

@Module({
  controllers: [
    AlquileresController,
    ObrasController,
    ProductosController,
    ProductosStockController,
    RecursosController,
  ],
  providers: [ObrasCrudSource, ProductosCrudSource, AddStockToProductoImpl, RegistrarAlquilerImpl],
})
export class AlquMaquModule {}
