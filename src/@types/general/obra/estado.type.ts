import { CtmType } from '@common/domain/types';

export type EstadoObraCode = 1 | 2 | 3 | 4;

export class EstadoObraType extends CtmType<EstadoObraCode> {}

const PLANEADA = new EstadoObraType(1, 'PLANEADA');
const ACTIVA = new EstadoObraType(2, 'ACTIVA');
const PAUSADA = new EstadoObraType(3, 'PAUSADA');
const COMPLETADA = new EstadoObraType(4, 'COMPLETADA');

export function estadoObraTypeFactory(code: EstadoObraCode): EstadoObraType {
  switch (code) {
    case 1: return PLANEADA;
    case 2: return ACTIVA;
    case 3: return PAUSADA;
    case 4: return COMPLETADA;
    default: throw new Error('No existe estado de obra valido con este codigo');
  }
}

export const ESTADO_OBRA = { PLANEADA, ACTIVA, PAUSADA, COMPLETADA };

export const ESTADO_OBRA_VALUES = [PLANEADA, ACTIVA, PAUSADA, COMPLETADA];
