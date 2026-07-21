import { TarifaProductoOrm } from './producto-tarifa.orm';
import { ProductoStockOrm } from './producto-stock.orm';
import { ProductoOrm } from './producto.orm';
import { ObraOrm } from './obra.orm';

export * from './producto-tarifa.orm';
export * from './producto-stock.orm';
export * from './producto.orm';
export * from './obra.orm';

export const ORM_ALQ_MAQ_ENTITIES = [TarifaProductoOrm, ProductoStockOrm, ProductoOrm, ObraOrm];
