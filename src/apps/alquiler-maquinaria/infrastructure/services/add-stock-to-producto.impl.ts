import { Injectable } from '@nestjs/common';
import { categoriaProductoTypeFactory } from '@ctypes/alquiler-maquinaria/producto';
import { TIPOS_TERCERO } from '@ctypes/general/tercero';
import { RSA_SERVICES } from '@common/application/services';
import { TRANSACTIONS } from '@common/application/transactions';
import { BaseSource } from '@common/infrastructure/services';
import { ProductoOrm, ProductoStockOrm, TarifaProductoOrm } from '@orm/alquiler-maquinaria';
import { AddProductoStockDto } from '../../application/dtos';
import { TerceroOrm } from '@orm/seguridad';
import { Not } from 'typeorm';

@Injectable()
export class AddStockToProductoImpl extends BaseSource {
  public async execute(body: AddProductoStockDto): Promise<boolean> {
    try {
      await this.qr.connect();
      await this.qr.startTransaction();

      if (!this.auth.terceroId) throw new Error('El usuario no tiene un tercero asociado');

      const productoRp = this.qr.manager.getRepository(ProductoOrm);
      const terceroRp = this.qr.manager.getRepository(TerceroOrm);
      const stockRp = this.qr.manager.getRepository(ProductoStockOrm);

      const producto = await productoRp.findOne({ where: { id: body.productoId } });
      if (!producto) throw new Error('No existe un producto con este id');

      const proveedor = await terceroRp.findOne({ where: { id: this.auth.terceroId } });
      if (!proveedor) throw new Error('No existe el tercero asociado al usuario autenticado');

      const proveedorCode = TIPOS_TERCERO.PROVEEDOR.getCode();
      const clienteProveedorCode = TIPOS_TERCERO.CLIENTE_PROVEEDOR.getCode();
      if (![proveedorCode, clienteProveedorCode].includes(proveedor.tipoCode)) {
        throw new Error('El tercero autenticado no esta configurado como proveedor');
      }

      let stock = await stockRp.findOne({
        where: { productoId: producto.id, proveedorId: proveedor.id },
      });

      if (!stock) {
        stock = new ProductoStockOrm();
        stock.productoId = producto.id;
        stock.proveedorId = proveedor.id;
        stock.stockOriginal = 0;
        stock.stockDisponible = 0;
        stock.stockReservado = 0;
        stock.stockEnAlquiler = 0;
        stock.stockEnMantenimiento = 0;
        stock.stockRetirado = 0;
      }

      stock.stockOriginal = (stock.stockOriginal ?? 0) + body.cantidad;
      stock.stockDisponible = (stock.stockDisponible ?? 0) + body.cantidad;

      const stored = await stockRp.save(stock);

      await this.generateTransaccion(TRANSACTIONS.INN.PRODUCTOS.AGREGAR_STOCK, stored.id, this.qr);

      await this.qr.commitTransaction();

      return true;
    } catch (error: any) {
      await this.qr.rollbackTransaction();
      throw new Error(error.message);
    } finally {
      await this.qr.release();
    }
  }

  private decodeId(id: string, label: string): number {
    const decodedId = +RSA_SERVICES.decryptValue(id);
    if (!decodedId) throw new Error(`El id de ${label} no es valido`);
    return decodedId;
  }

  private ensureCategoria(categoriaCode: number): void {
    categoriaProductoTypeFactory(categoriaCode as any);
  }

  private async ensureCodigoDisponible(codigo: string, productoId?: number): Promise<void> {
    const productoRp = this.qr.manager.getRepository(ProductoOrm);
    const producto = await productoRp.findOne({
      where: productoId ? { codigo, id: Not(productoId) } : { codigo },
    });

    if (producto) throw new Error('Ya existe un producto con este codigo');
  }

  private async createTarifaActual(producto: ProductoOrm, valorTarifa: number): Promise<void> {
    const productoRp = this.qr.manager.getRepository(ProductoOrm);
    const tarifaRp = this.qr.manager.getRepository(TarifaProductoOrm);
    const fechaInicio = new Date();

    if (producto.tarifaActualId) {
      const tarifaActual = await tarifaRp.findOne({ where: { id: producto.tarifaActualId } });
      if (tarifaActual) {
        tarifaActual.fechaFin = fechaInicio;
        await tarifaRp.save(tarifaActual);
      }
    }

    const tarifa = new TarifaProductoOrm();
    tarifa.productoId = producto.id;
    tarifa.valor = valorTarifa;
    tarifa.fechaInicio = fechaInicio;
    tarifa.fechaFin = null as any;

    const storedTarifa = await tarifaRp.save(tarifa);
    producto.tarifaActualId = storedTarifa.id;
    await productoRp.save(producto);
  }
}
