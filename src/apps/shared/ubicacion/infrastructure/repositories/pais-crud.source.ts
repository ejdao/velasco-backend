import { Injectable } from '@nestjs/common';
import { PaisRes } from '@shared/ubicacion/application/responses';
import { TYPE_ORM_UTILITIES } from '@common/infrastructure/services';
import { SharedBaseSource } from '@shared/common';
import { UBICACION_FACTORIES } from '../factories';
import { PaisOrm } from '@orm/shared/ubicacion';

@Injectable()
export class PaisCrudSource extends SharedBaseSource {
  public async fetch(
    pattern: string,
    payload: { addDepartamentos: boolean; addMunicipios: boolean; addCorregimientos: boolean }
  ): Promise<PaisRes[]> {
    const relations: any = {};
    if (payload.addDepartamentos) relations.departamentos = true;
    if (payload.addMunicipios) relations.departamentos.municipios = true;
    if (payload.addCorregimientos) relations.departamentos.municipios.corregimientos = true;

    const paisRp = this.conn.getRepository(PaisOrm);
    const paises = await paisRp.find({
      where: pattern ? { nombre: TYPE_ORM_UTILITIES.like(pattern) } : {},
      relations,
      take: TYPE_ORM_UTILITIES.take(pattern),
    });

    return paises.map(p => UBICACION_FACTORIES.paisOrmToRes(p));
  }
}
