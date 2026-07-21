import { CtmType } from '@common/domain/types';

export type CategoriaProductoCode = 1 | 2 | 3;

export class CategoriaProductoType extends CtmType<CategoriaProductoCode> {}

const ESTRUCTURAS = new CategoriaProductoType(1, 'ESTRUCTURAS', '001');
const CONCRETO = new CategoriaProductoType(2, 'CONCRETO', '002');
const COMPACTACION = new CategoriaProductoType(3, 'COMPACTACIÓN', '003');

export function categoriaProductoTypeFactory(code: CategoriaProductoCode): CategoriaProductoType {
  switch (code) {
    case 1: return ESTRUCTURAS;
    case 2: return CONCRETO;
    case 3: return COMPACTACION;
    default: throw new Error('No existe categoria de producto valida con este codigo');
  }
}

export const CATEGORIA_PRODUCTO = { ESTRUCTURAS, CONCRETO, COMPACTACION };

export const CATEGORIA_PRODUCTO_VALUES = [ ESTRUCTURAS, CONCRETO, COMPACTACION ];
