import { CtmType } from '@common/domain/types';

export type EstadoProductoCode = 1 | 2 | 3 | 4 | 5;

export class EstadoProductoType extends CtmType<EstadoProductoCode> {}

const DISPONIBLE = new EstadoProductoType(1, 'DISPONIBLE');
const RESERVADO = new EstadoProductoType(2, 'RESERVADO');
const EN_ALQUILER = new EstadoProductoType(3, 'EN ALQUILER');
const MANTENIMIENTO = new EstadoProductoType(4, 'MANTENIMIENTO');
const RETIRADO = new EstadoProductoType(5, 'RETIRADO');

export function estadoProductoTypeFactory(code: EstadoProductoCode): EstadoProductoType {
  switch (code) {
    case 1: return DISPONIBLE;
    case 2: return RESERVADO;
    case 3: return EN_ALQUILER;
    case 4: return MANTENIMIENTO;
    case 5: return RETIRADO;
    default: throw new Error('No existe estado de producto valido con este codigo');
  }
}

export const ESTADO_PRODUCTO = { DISPONIBLE, RESERVADO, EN_ALQUILER, MANTENIMIENTO, RETIRADO };

export const ESTADO_PRODUCTO_VALUES = [ DISPONIBLE, RESERVADO, EN_ALQUILER, MANTENIMIENTO, RETIRADO ];
