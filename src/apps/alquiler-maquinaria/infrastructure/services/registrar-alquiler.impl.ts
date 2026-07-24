import { Injectable } from '@nestjs/common';
import { TRANSACTIONS } from '@common/application/transactions';
import { BaseSource } from '@common/infrastructure/services';
import { AlquilerOrm, ItemAlquilerOrm, ObraOrm, ProductoStockOrm } from '@orm/alquiler-maquinaria';
import { CreateAlquilerDto, CreateAlquilerItemDto } from '../../application/dtos';

@Injectable()
export class RegistrarAlquilerImpl extends BaseSource {
  public async execute(body: CreateAlquilerDto): Promise<boolean> {
    try {
      await this.qr.connect();
      await this.qr.startTransaction();

      this.ensureDetalleSinDuplicados(body.detalle);

      const obraRp = this.qr.manager.getRepository(ObraOrm);
      const alquilerRp = this.qr.manager.getRepository(AlquilerOrm);
      const itemRp = this.qr.manager.getRepository(ItemAlquilerOrm);
      const stockRp = this.qr.manager.getRepository(ProductoStockOrm);

      const obra = await obraRp.findOne({ where: { id: body.obraId } });
      if (!obra) throw new Error('No existe una obra con este id');

      const alquiler = new AlquilerOrm();
      alquiler.obraId = obra.id;
      alquiler.fechaInicio = new Date(body.fechaInicio);

      const storedAlquiler = await alquilerRp.save(alquiler);

      for (const itemBody of body.detalle) {
        const stock = await stockRp.findOne({ where: { id: itemBody.stockId } });

        if (!stock) throw new Error('No existe un stock de producto con este id');

        const stockDisponible = stock.stockDisponible ?? 0;
        if (itemBody.cantidad > stockDisponible) {
          throw new Error(
            `La cantidad a alquilar (${itemBody.cantidad}) supera el stock disponible (${stockDisponible})`
          );
        }

        if (!stock.producto?.tarifaActual) {
          throw new Error('El producto no tiene una tarifa actual configurada');
        }

        stock.stockDisponible = stockDisponible - itemBody.cantidad;
        stock.stockEnAlquiler = (stock.stockEnAlquiler ?? 0) + itemBody.cantidad;

        await stockRp.save(stock);

        const item = new ItemAlquilerOrm();
        item.alquilerId = storedAlquiler.id;
        item.stockId = stock.id;
        item.cantidad = itemBody.cantidad;
        item.valorTarifa = itemBody.tarifa;

        await itemRp.save(item);
      }

      await this.generateTransaccion(
        TRANSACTIONS.INN.PRODUCTOS.ALQUILAR_STOCK,
        storedAlquiler.id,
        this.qr
      );

      await this.qr.commitTransaction();

      return true;
    } catch (error: any) {
      await this.qr.rollbackTransaction();
      throw new Error(error.message);
    } finally {
      await this.qr.release();
    }
  }

  private ensureDetalleSinDuplicados(detalle: CreateAlquilerItemDto[]): void {
    const stockIds = new Set<number>();

    for (const item of detalle) {
      if (stockIds.has(item.stockId)) {
        throw new Error('No se puede repetir el mismo stock en el detalle del alquiler');
      }

      stockIds.add(item.stockId);
    }
  }
}
