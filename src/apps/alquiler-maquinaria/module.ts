import { Module } from '@nestjs/common';
import {
  ObrasCrudSource,
  ProductosCrudSource,
  RecursosSource,
} from './infrastructure/repositories';
import { ObrasController, ProductosController } from './presentation/controllers';
import { RecursosController } from './presentation/controllers';

@Module({
  controllers: [ObrasController, ProductosController, RecursosController],
  providers: [ObrasCrudSource, ProductosCrudSource, RecursosSource],
})
export class AlquMaquModule {}
