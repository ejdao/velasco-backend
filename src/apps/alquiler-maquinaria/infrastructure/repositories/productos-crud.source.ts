import { Injectable } from '@nestjs/common';
import { RSA_SERVICES, STRING_UTILITIES } from '@common/application/services';
import { BaseSource } from '@common/infrastructure/services';
import { CategoriaProductoOrm, ProductoOrm, TarifaProductoOrm } from '@orm/alquiler-maquinaria';
import { Not } from 'typeorm';
import { CreateProductoDto, UpdateProductoDto } from '../../application/dtos';

@Injectable()
export class ProductosCrudSource extends BaseSource {
  public async create(body: CreateProductoDto): Promise<boolean> {
    try {
      await this.qr.connect();
      await this.qr.startTransaction();

      const productoRp = this.qr.manager.getRepository(ProductoOrm);
      const codigo = STRING_UTILITIES.upperCaseAndTrim(body.codigo);

      await this.ensureCategoria(body.categoriaId);
      await this.ensureCodigoDisponible(codigo);

      const producto = new ProductoOrm();
      producto.codigo = codigo;
      producto.nombre = STRING_UTILITIES.trim(body.nombre);
      producto.descripcion = STRING_UTILITIES.trim(body.descripcion);
      producto.categoriaId = body.categoriaId;
      producto.tarifaActualId = null as any;

      const stored = await productoRp.save(producto);

      if (body.valorTarifa !== undefined) {
        await this.createTarifaActual(stored, body.valorTarifa);
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

  public async update(id: string, body: UpdateProductoDto): Promise<boolean> {
    try {
      await this.qr.connect();
      await this.qr.startTransaction();

      const productoId = this.decodeId(id, 'producto');
      const productoRp = this.qr.manager.getRepository(ProductoOrm);
      const producto = await productoRp.findOne({ where: { id: productoId } });

      if (!producto) throw new Error('No existe un producto con este id');

      if (body.codigo !== undefined) {
        const codigo = STRING_UTILITIES.upperCaseAndTrim(body.codigo);
        await this.ensureCodigoDisponible(codigo, productoId);
        producto.codigo = codigo;
      }

      if (body.categoriaId !== undefined) {
        await this.ensureCategoria(body.categoriaId);
        producto.categoriaId = body.categoriaId;
      }

      if (body.nombre !== undefined) producto.nombre = STRING_UTILITIES.trim(body.nombre);
      if (body.descripcion !== undefined) {
        producto.descripcion = STRING_UTILITIES.trim(body.descripcion);
      }

      const stored = await productoRp.save(producto);

      if (body.valorTarifa !== undefined) {
        await this.createTarifaActual(stored, body.valorTarifa);
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

  private decodeId(id: string, label: string): number {
    const decodedId = +RSA_SERVICES.decryptValue(id);
    if (!decodedId) throw new Error(`El id de ${label} no es valido`);
    return decodedId;
  }

  private async ensureCategoria(categoriaId: number): Promise<void> {
    const categoriaRp = this.qr.manager.getRepository(CategoriaProductoOrm);
    const categoria = await categoriaRp.findOne({ where: { id: categoriaId } });

    if (!categoria) throw new Error('No existe una categoria de producto con este id');
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
