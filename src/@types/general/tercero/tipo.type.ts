import { CtmType } from '@common/domain/types';

export type TipoTerceroCode = 1 | 2 | 3;

export class TipoTerceroType extends CtmType<TipoTerceroCode> {}

const CLIENTE = new TipoTerceroType(1, 'CLIENTE');
const PROVEEDOR = new TipoTerceroType(2, 'PROVEEDOR');
const CLIENTE_PROVEEDOR = new TipoTerceroType(3, 'CLIENTE/PROVEEDOR');

export function tipoTerceroTypeFactory(code: TipoTerceroCode): TipoTerceroType {
  switch (code) {
    case 1:return CLIENTE;
    case 2: return PROVEEDOR;
    case 3: return CLIENTE_PROVEEDOR;
    default: throw new Error('No existe tipo de tercero valido con este codigo');
  }
}

export const TIPOS_TERCERO = { CLIENTE, PROVEEDOR, CLIENTE_PROVEEDOR };

export const TIPOS_TERCERO_VALUES = [CLIENTE, PROVEEDOR, CLIENTE_PROVEEDOR];
