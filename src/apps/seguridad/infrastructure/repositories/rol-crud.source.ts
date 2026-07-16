import { Like } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { FetchRolRes } from '@seg/application/responses';
import { STRING_UTILITIES } from '@common/application/services';
import { BaseSource } from '@common/infrastructure/services';
import { rolOrmToFetchRolResFactory } from '../factories';
import { RolOrm } from '@orm/seguridad';

@Injectable()
export class RolCrudSource extends BaseSource {
  public async fetch(pattern: string, addComplements: boolean): Promise<FetchRolRes[]> {
    const rolRp = this.conn.getRepository(RolOrm);
    let roles = await rolRp.find({
      where: pattern
        ? [
            { codigo: Like(`%${STRING_UTILITIES.upperCaseAndTrim(pattern)}%`) },
            { nombre: Like(`%${STRING_UTILITIES.upperCaseAndTrim(pattern)}%`) },
          ]
        : undefined,
      relations: addComplements ? { permisos: { modulo: true, subModulo: true } } : undefined,
    });

    /** Solo sale rol "SIN PERMISOS" (001) cuando estan creando al nuevo usuario */
    if (!pattern) roles = roles.filter(r => r.codigo !== '001');

    return roles.map(r => rolOrmToFetchRolResFactory(r, addComplements));
  }
}
