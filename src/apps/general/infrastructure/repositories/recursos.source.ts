import { Injectable } from '@nestjs/common';
import { TYPE_ORM_UTILITIES, BaseSource } from '@common/infrastructure/services';
import { entidadOrmToRecursoRes, RecursoRes } from '@shared/common';
import { TerceroOrm, UsuarioOrm } from '@orm/seguridad';
import { uniq } from 'lodash';
import { In } from 'typeorm';

@Injectable()
export class RecursosSource extends BaseSource {
  public async fetchTerceros(pattern: string): Promise<RecursoRes[]> {
    const terceroRp = this.conn.getRepository(TerceroOrm);
    const usuarioRp = this.conn.getRepository(UsuarioOrm);

    const usuarios = await usuarioRp.find({
      where: { empresas: { codigo: this.auth.enterpriseCode } },
      relations: { terceros: true },
    });

    const terceroIds = [0];
    usuarios.forEach(usuario => {
      usuario.terceros?.forEach(tercero => terceroIds.push(tercero.id));
    });

    const terceroIdsUnicos = uniq(terceroIds);

    const terceros = await terceroRp.find({
      where: pattern
        ? [
            { id: In(terceroIdsUnicos), nit: TYPE_ORM_UTILITIES.like(pattern) },
            { id: In(terceroIdsUnicos), nombre: TYPE_ORM_UTILITIES.like(pattern) },
          ]
        : { id: In(terceroIdsUnicos) },
      order: { nombre: 'ASC' },
      take: TYPE_ORM_UTILITIES.take(pattern),
    });

    return terceros.map(tercero => entidadOrmToRecursoRes(tercero, false, { codigo: 'nit' }));
  }
}
