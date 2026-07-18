import { Module } from '@nestjs/common';
import { ClientesCrudSource, RecursosSource } from './infrastructure/repositories';
import { ClientesController, RecursosController } from './presentation/controllers';

@Module({
  controllers: [ClientesController, RecursosController],
  providers: [ClientesCrudSource, RecursosSource],
})
export class GeneralModule {}
