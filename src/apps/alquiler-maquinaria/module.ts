import { Module } from '@nestjs/common';
import { ObrasCrudSource } from './infrastructure/repositories';
import { ObrasController } from './presentation/controllers';

@Module({
  controllers: [ObrasController],
  providers: [ObrasCrudSource],
})
export class AlquilerMaquinariaModule {}
