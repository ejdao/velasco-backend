import { Injectable } from '@nestjs/common';
import { BaseSource } from '@common/infrastructure/services';
import { terceroOrmToFetchClienteResFactory } from '../factories';
import { FetchClienteRes } from '@general/application/responses';
import { TerceroOrm, UsuarioOrm } from '@orm/seguridad';
import { MunicipioOrm } from '@orm/shared/ubicacion';
import { uniq } from 'lodash';
import { In } from 'typeorm';

@Injectable()
export class ClientesCrudSource extends BaseSource {
  public async fetch(): Promise<FetchClienteRes[]> {
    const terceroRp = this.conn.getRepository(TerceroOrm);
    const usuarioRp = this.conn.getRepository(UsuarioOrm);
    const municipioRp = this.sharedConn.getRepository(MunicipioOrm);

    const usuarios = await usuarioRp.find({
      where: { empresas: { codigo: this.auth.enterpriseCode } },
      relations: { terceros: true },
    });

    const terceroIds = [0];

    usuarios.forEach(u => {
      if (u.terceros) {
        u.terceros.forEach(ut => {
          terceroIds.push(ut.id);
        });
      }
    });

    const terceros = await terceroRp.find({ where: { id: In(uniq(terceroIds)) } });

    const municipios = await municipioRp.find({
      where: { id: In(uniq(terceros.map(t => t.municipioId))) },
    });

    terceros.map(t => {
      t.municipio = municipios.find(m => m.id === t.municipioId)!;
      const usuarioIds = [0];
      usuarios.forEach(u => {
        if (u.terceros) {
          u.terceros.forEach(ut => {
            if (ut.id === t.id) usuarioIds.push(u.id);
          });
        }
      });
      t.usuarios = usuarios.filter(u => new Set(usuarioIds).has(u.id));
    });

    return terceros.map(cliente => terceroOrmToFetchClienteResFactory(cliente));
  }
}
