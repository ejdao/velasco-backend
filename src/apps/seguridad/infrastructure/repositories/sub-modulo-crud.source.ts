import { Injectable } from '@nestjs/common';
import { RSA_SERVICES, STRING_UTILITIES } from '@common/application/services';
import { CreateSubModuloDto } from '@seg/application/dtos';
import { ModuloOrm, SubModuloOrm } from '@orm/seguridad';
import { CTM_CONTEXTS_AUTHS_VALUES } from '@common/domain/types';
import { BaseSource } from '@common/infrastructure/services';

@Injectable()
export class SubModulosCrudSource extends BaseSource {
  public async create(body: CreateSubModuloDto): Promise<boolean> {
    body.nombre = STRING_UTILITIES.upperCaseAndTrim(body.nombre);
    body.moduloId = RSA_SERVICES.decryptValue(body.moduloId);
    let subModuloForThisBBDD: SubModuloOrm;
    const moduloRp = this.conn.getRepository(ModuloOrm);
    const subModuloRp = this.conn.getRepository(SubModuloOrm);
    const modulo = await moduloRp.findOne({ where: { id: +body.moduloId } });
    const subModuloConMismoNombre = await subModuloRp.find({
      where: { nombre: body.nombre, moduloId: +body.moduloId },
    });
    if (subModuloConMismoNombre.length) throw new Error('Ya existe un subModulo con este nombre');

    for (let index = 0; index < CTM_CONTEXTS_AUTHS_VALUES.length; index++) {
      const ctx = CTM_CONTEXTS_AUTHS_VALUES[index];
      const qr = this.dynamicQR(ctx);
      await qr.connect();
      await qr.startTransaction();
      try {
        const localModuloRp = qr.manager.getRepository(ModuloOrm);
        const localModulo = await localModuloRp.findOne({ where: { codigo: modulo!.codigo } });

        body.nombre = body.nombre.trim();

        await this.verifyEntityExist('GENSEGMODULO', +body.moduloId, qr);

        const lastSubModulo = await subModuloRp.find({
          where: { moduloId: +body.moduloId },
          order: { id: 'desc' },
          take: 1,
        });

        const newCodigoSubModulo = lastSubModulo.length ? +lastSubModulo[0].codigo + 1 : 1;
        const zeros = newCodigoSubModulo <= 9 ? '00' : newCodigoSubModulo <= 99 ? '0' : '';

        const newSubModulo = new SubModuloOrm();
        newSubModulo.codigo = `${zeros}${newCodigoSubModulo}`;
        newSubModulo.isActivo = true;
        newSubModulo.moduloId = localModulo!.id;
        newSubModulo.nombre = body.nombre;

        const subModuloStored = await subModuloRp.save(newSubModulo);

        if (ctx === this.auth.context) {
          subModuloForThisBBDD = subModuloStored;
        }

        await qr.commitTransaction();
      } catch (error: any) {
        await qr.rollbackTransaction();
        throw new Error(`El registró falló en ${ctx.getCode()}: ${error.message}`);
      } finally {
        await qr.release();
      }
    }

    return true;
  }
}
