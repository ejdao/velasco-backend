import { Module } from '@nestjs/common';
import { RecursosController } from './presentation/controllers';

@Module({
  controllers: [RecursosController],
  providers: [],
})
export class AlquilerMaquinariaModule {}
