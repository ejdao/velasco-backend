import { Injectable } from '@nestjs/common';
import { BaseSource } from '@common/infrastructure/services';
import { terceroOrmToFetchTerceroResFactory } from '../factories';
import { FetchTerceroRes } from '@general/application/responses';
import { CreateTerceroDto } from '@general/application/dtos';
import { ESTADO_USUARIO } from '@ctypes/general/usuario';
import { TIPOS_TERCERO, TipoTerceroCode, tipoTerceroTypeFactory } from '@ctypes/general/tercero';
import { TerceroOrm, UsuarioOrm } from '@orm/seguridad';
import { MunicipioOrm } from '@orm/shared/ubicacion';
import { uniq } from 'lodash';
import { In } from 'typeorm';

@Injectable()
export class TercerosCrudSource extends BaseSource {
  public async fetch(tipoCode: TipoTerceroCode): Promise<FetchTerceroRes[]> {
    const terceroRp = this.conn.getRepository(TerceroOrm);
    const usuarioRp = this.conn.getRepository(UsuarioOrm);
    const municipioRp = this.sharedConn.getRepository(MunicipioOrm);
    const tipoCodes = this.getTipoCodesFilter(tipoCode)!;

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
      where: {
        id: In(uniq(terceroIds)),
        tipoCode: In(tipoCodes),
      },
      relations: { usuarios: true },
    });

    const municipios = await municipioRp.find({
      where: { id: In(uniq(terceros.map(t => t.municipioId))) },
    });

    terceros.map(t => {
      t.municipio = municipios.find(m => m.id === t.municipioId)!;
    });

    return terceros.map(tercero => terceroOrmToFetchTerceroResFactory(tercero));
  }

  public async create(body: CreateTerceroDto): Promise<boolean> {
    try {
      const terceroRp = this.conn.getRepository(TerceroOrm);
      const tipoCode = tipoTerceroTypeFactory(body.tipoCode).getCode();

      const existing = await terceroRp.findOne({ where: { documento: body.nit } });
      if (existing) throw new Error('Ya existe un tercero con este NIT');

      const tercero = new TerceroOrm();
      tercero.documento = body.nit;
      tercero.nombre = body.nombre;
      tercero.direccion = body.direccion;
      tercero.tipoCode = tipoCode;
      tercero.tipoPersonaCode = body.tipoPersonaCode;
      tercero.municipioId = body.municipioId;
      tercero.estadoCode = ESTADO_USUARIO.ACTIVO.getCode();

      await terceroRp.save(tercero);

      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  private getTipoCodesFilter(tipoCode: TipoTerceroCode): TipoTerceroCode[] | undefined {
    const tipoCodeValid = tipoTerceroTypeFactory(tipoCode).getCode();
    const cliProvCode = TIPOS_TERCERO.CLIENTE_PROVEEDOR.getCode();
    if (tipoCodeValid === TIPOS_TERCERO.CLIENTE.getCode()) return [tipoCodeValid, cliProvCode];
    if (tipoCodeValid === TIPOS_TERCERO.PROVEEDOR.getCode()) return [tipoCodeValid, cliProvCode];
    return [tipoCodeValid];
  }
}
