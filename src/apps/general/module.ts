import { Module } from '@nestjs/common';
import { ClientesCrudSource } from './infrastructure/repositories';
import { ClientesController, RecursosController } from './presentation/controllers';

@Module({
  controllers: [ClientesController, RecursosController],
  providers: [ClientesCrudSource],
})
export class GeneralModule {}
