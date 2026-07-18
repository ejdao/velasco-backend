import { CtmType } from '@common/domain/types';

export type TipoTerceroCode = 1 | 2;

export class TipoTerceroType extends CtmType<TipoTerceroCode> {}

const PERSONA_NATURAL = new TipoTerceroType(1, 'PERSONA NATURAL');
const PERSONA_JURIDICA = new TipoTerceroType(2, 'PERSONA JURIDICA');

export function tipoTerceroTypeFactory(code: TipoTerceroCode): TipoTerceroType {
  switch (code) {
    case 1: return PERSONA_NATURAL;
    case 2: return PERSONA_JURIDICA;
    default: throw new Error('No existe tipo de persona valido con este codigo');
  }
}

export const TIPOS_TERCERO = {PERSONA_NATURAL, PERSONA_JURIDICA};

export const TIPOS_TERCERO_VALUES = [PERSONA_NATURAL, PERSONA_JURIDICA];
