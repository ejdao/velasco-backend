import { CtmType } from '@common/domain/types';

export type TipoPersonaTerceroCode = 1 | 2;

export class TipoPersonaTerceroType extends CtmType<TipoPersonaTerceroCode> {}

const PERSONA_NATURAL = new TipoPersonaTerceroType(1, 'PERSONA NATURAL');
const PERSONA_JURIDICA = new TipoPersonaTerceroType(2, 'PERSONA JURIDICA');

export function tipoPersonaTerceroTypeFactory(
  code: TipoPersonaTerceroCode
): TipoPersonaTerceroType {
  switch (code) {
    case 1: return PERSONA_NATURAL;
    case 2: return PERSONA_JURIDICA;
    default: throw new Error('No existe tipo de persona valido con este codigo');
  }
}

export const TIPOS_PERSONA_TERCERO = { PERSONA_NATURAL, PERSONA_JURIDICA };

export const TIPOS_PERSONA_TERCERO_VALUES = [PERSONA_NATURAL, PERSONA_JURIDICA];
