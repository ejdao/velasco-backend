import { Injectable } from '@nestjs/common';
import { BaseSource } from '@common/infrastructure/services';
import { CategoriaProductoOrm } from '@orm/alquiler-maquinaria';
import { RecursoRes } from '@shared/common';

@Injectable()
export class RecursosSource extends BaseSource {
  public async fetchCategoriasProducto(): Promise<RecursoRes[]> {
    const categoriaRp = this.conn.getRepository(CategoriaProductoOrm);
    const categorias = await categoriaRp.find({ order: { nombre: 'ASC' } });

    return categorias.map(categoria => ({
      id: categoria.id,
      codigo: categoria.codigo,
      nombre: categoria.nombre,
    }));
  }
}
