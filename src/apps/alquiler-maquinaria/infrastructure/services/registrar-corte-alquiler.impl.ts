import { Injectable } from '@nestjs/common';
import { STRING_UTILITIES } from '@common/application/services';
import { BaseSource } from '@common/infrastructure/services';
import { AlquilerCorteOrm, AlquilerOrm } from '@orm/alquiler-maquinaria';
import { CreateAlquilerCorteDto } from '../../application/dtos';

@Injectable()
export class RegistrarCorteAlquilerImpl extends BaseSource {
  public async execute(alquilerId: number, body: CreateAlquilerCorteDto): Promise<boolean> {
    try {
      await this.qr.connect();
      await this.qr.startTransaction();

      const fechaCorte = this.toStartOfDay(body.fechaCorte);
      const alquilerRp = this.qr.manager.getRepository(AlquilerOrm);
      const corteRp = this.qr.manager.getRepository(AlquilerCorteOrm);

      const alquiler = await alquilerRp.findOne({
        where: { id: alquilerId },
        relations: { detalle: { stock: true }, cortes: true },
      });

      if (!alquiler) throw new Error('No existe un alquiler con este id');
      if (alquiler.fechaFin) throw new Error('Este alquiler ya tiene fecha de finalización');
      if (!alquiler.detalle?.length) throw new Error('El alquiler no tiene items para facturar');

      const fechaInicio = this._resolveFechaInicioCorte(alquiler);

      if (fechaCorte.getTime() < fechaInicio.getTime()) {
        throw new Error('La fecha de corte no puede ser anterior a la fecha inicial del corte');
      }

      const diasFacturados = this._diffDaysInclusive(fechaInicio, fechaCorte);

      const valorDiario = alquiler.detalle.reduce(
        (total, item) => total + Number(item.valorTarifa) * item.cantidad,
        0
      );

      const corte = new AlquilerCorteOrm();
      corte.alquilerId = alquiler.id;
      corte.fechaInicio = fechaInicio;
      corte.fechaFin = fechaCorte;
      corte.totalFacturado = this._roundCurrency(valorDiario * diasFacturados);
      if (body.observacion !== undefined) {
        corte.observacion = STRING_UTILITIES.trim(body.observacion);
      }

      await corteRp.save(corte);

      if (body.isUltimoCorte) {
        alquiler.fechaFin = fechaCorte;

        for (const item of alquiler.detalle) {
          if (!item.stock) throw new Error('No existe stock asociado a un item del alquiler');

          const stockEnAlquiler = item.stock.stockEnAlquiler ?? 0;
          if (stockEnAlquiler < item.cantidad) {
            throw new Error('El stock en alquiler es menor a la cantidad a devolver');
          }

          item.stock.stockDisponible = (item.stock.stockDisponible ?? 0) + item.cantidad;
          item.stock.stockEnAlquiler = stockEnAlquiler - item.cantidad;

          await this.qr.manager.save(item.stock);
          await this.qr.manager.save(item);
        }

        await alquilerRp.save(alquiler);
      }

      await this.qr.commitTransaction();

      return true;
    } catch (error: any) {
      await this.qr.rollbackTransaction();
      throw new Error(error.message);
    } finally {
      await this.qr.release();
    }
  }

  private _resolveFechaInicioCorte(alquiler: AlquilerOrm): Date {
    const cortes = [...(alquiler.cortes ?? [])].filter(corte => corte.fechaFin);

    if (!cortes.length) return this.toStartOfDay(alquiler.fechaInicio);

    const ultimoCorte = cortes.sort((a, b) => b.fechaFin.getTime() - a.fechaFin.getTime())[0];

    return this._addDays(this.toStartOfDay(ultimoCorte.fechaFin), 1);
  }

  private toStartOfDay(date: Date | string): Date {
    const value = typeof date === 'string' ? date : date.toISOString().split('T')[0];
    return new Date(`${value.split('T')[0]}T00:00:00.000Z`);
  }

  private _addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setUTCDate(result.getUTCDate() + days);
    return result;
  }

  private _diffDaysInclusive(start: Date, end: Date): number {
    const msByDay = 24 * 60 * 60 * 1000;
    return Math.floor((end.getTime() - start.getTime()) / msByDay) + 1;
  }

  private _roundCurrency(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
