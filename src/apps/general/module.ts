import { Module } from '@nestjs/common';
import { RecursosSource, TercerosCrudSource } from './infrastructure/repositories';
import { RecursosController, TercerosController } from './presentation/controllers';

@Module({
  controllers: [TercerosController, RecursosController],
  providers: [TercerosCrudSource, RecursosSource],
})
export class GeneralModule {}
