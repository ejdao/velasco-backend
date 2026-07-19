import { Module } from '@nestjs/common';
import { ObrasCrudSource, ProductosCrudSource } from './infrastructure/repositories';
import { ObrasController, ProductosController } from './presentation/controllers';

@Module({
  controllers: [ObrasController, ProductosController],
  providers: [ObrasCrudSource, ProductosCrudSource],
})
export class AlquilerMaquinariaModule {}
