import { Injectable } from '@nestjs/common';
import { BaseSource } from '@common/infrastructure/services';
import { terceroOrmToFetchClienteResFactory } from '../factories';
import { FetchClienteRes } from '@general/application/responses';
import { CreateClienteDto } from '@general/application/dtos';
import { ESTADO_USUARIO } from '@ctypes/general/usuario';
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

    const terceros = await terceroRp.find({
      where: { id: In(uniq(terceroIds)) },
      relations: { usuarios: true },
    });

    const municipios = await municipioRp.find({
      where: { id: In(uniq(terceros.map(t => t.municipioId))) },
    });

    terceros.map(t => {
      t.municipio = municipios.find(m => m.id === t.municipioId)!;
    });

    return terceros.map(tercero => terceroOrmToFetchClienteResFactory(tercero));
  }

  public async create(body: CreateClienteDto): Promise<boolean> {
    try {
      const terceroRp = this.conn.getRepository(TerceroOrm);

      const existing = await terceroRp.findOne({ where: { nit: body.nit } });
      if (existing) throw new Error('Ya existe un cliente con este NIT');

      const cliente = new TerceroOrm();
      cliente.nit = body.nit;
      cliente.nombre = body.nombre;
      cliente.direccion = body.direccion;
      cliente.tipoCode = body.tipoPersonaCode;
      cliente.municipioId = body.municipioId;
      cliente.estadoCode = ESTADO_USUARIO.ACTIVO.getCode();

      await terceroRp.save(cliente);

      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
