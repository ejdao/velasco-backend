import { CategoriaProductoOrm } from './producto-categoria.orm';
import { TarifaProductoOrm } from './producto-tarifa.orm';
import { ProductoOrm } from './producto.orm';
import { ObraOrm } from './obra.orm';

export * from './producto-categoria.orm';
export * from './producto-tarifa.orm';
export * from './producto.orm';
export * from './obra.orm';

export const ORM_ALQ_MAQ_ENTITIES = [
  // --- //
  CategoriaProductoOrm,
  TarifaProductoOrm,
  ProductoOrm,
  ObraOrm,
];
