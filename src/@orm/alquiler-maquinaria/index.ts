import { TarifaProductoOrm } from './producto-tarifa.orm';
import { ProductoStockOrm } from './producto-stock.orm';
import { ProductoOrm } from './producto.orm';
import { ItemAlquilerOrm } from './producto-alquiler.orm';
import { ObraOrm } from './obra.orm';
import { AlquilerOrm } from './alquiler.orm';
import { AlquilerCorteOrm } from './alquiler-corte.orm';

export * from './producto-tarifa.orm';
export * from './producto-stock.orm';
export * from './producto.orm';
export * from './producto-alquiler.orm';
export * from './obra.orm';
export * from './alquiler.orm';
export * from './alquiler-corte.orm';

export const ORM_ALQ_MAQ_ENTITIES = [
  TarifaProductoOrm,
  ProductoStockOrm,
  ProductoOrm,
  ItemAlquilerOrm,
  AlquilerOrm,
  AlquilerCorteOrm,
  ObraOrm,
];
