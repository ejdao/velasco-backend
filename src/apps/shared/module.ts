import { Module } from '@nestjs/common';
import { UbicacionModule } from './ubicacion/ubicacion.module';
import { FileSaverModule } from './file-saver';

export const SRD_MODULES = [FileSaverModule, UbicacionModule];

@Module({ imports: SRD_MODULES })
export class SharedModule {}
