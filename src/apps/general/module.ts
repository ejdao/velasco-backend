import { Module } from '@nestjs/common';
import { ClientesCrudSource } from './infrastructure/repositories';
import { ClientesController } from './presentation/controllers';

@Module({
  controllers: [ClientesController],
  providers: [ClientesCrudSource],
})
export class GeneralModule {}
