import { Injectable } from '@nestjs/common';
import { ESTADO_OBRA, estadoObraTypeFactory } from '@ctypes/general/obra';
import { RSA_SERVICES, STRING_UTILITIES } from '@common/application/services';
import { BaseSource } from '@common/infrastructure/services';
import { ObraOrm } from '@orm/alquiler-maquinaria';
import { TerceroOrm, UsuarioOrm } from '@orm/seguridad';
import { MunicipioOrm } from '@orm/shared/ubicacion';
import { CreateObraDto, UpdateObraDto } from '../../application/dtos';

@Injectable()
export class ObrasCrudSource extends BaseSource {
  public async create(body: CreateObraDto): Promise<boolean> {
    try {
      await this.qr.connect();
      await this.qr.startTransaction();

      await this.ensureTerceroEmpresa(body.terceroId);
      await this.ensureMunicipio(body.municipioId);

      const responsableId = this.decodeUsuarioId(body.responsableId, 'responsable');
      const vendedorId = this.decodeUsuarioId(body.vendedorId, 'vendedor');

      await this.ensureUsuarioEmpresa(responsableId, 'responsable');
      await this.ensureUsuarioEmpresa(vendedorId, 'vendedor');

      const obraRp = this.qr.manager.getRepository(ObraOrm);
      const obra = new ObraOrm();
      obra.nombre = STRING_UTILITIES.trim(body.nombre);
      obra.terceroId = body.terceroId;
      obra.municipioId = body.municipioId;
      obra.direccion = STRING_UTILITIES.trim(body.direccion);
      obra.responsableId = responsableId;
      obra.vendedorId = vendedorId;
      obra.estadoCode = estadoObraTypeFactory(
        body.estadoCode ?? ESTADO_OBRA.PLANEADA.getCode()
      ).getCode();
      obra.notas = STRING_UTILITIES.trim(body.notas);

      await obraRp.save(obra);
      await this.qr.commitTransaction();

      return true;
    } catch (error: any) {
      await this.qr.rollbackTransaction();
      throw new Error(error.message);
    } finally {
      await this.qr.release();
    }
  }

  public async update(id: string, body: UpdateObraDto): Promise<boolean> {
    try {
      await this.qr.connect();
      await this.qr.startTransaction();

      const obraId = this.decodeId(id, 'obra');
      const obraRp = this.qr.manager.getRepository(ObraOrm);
      const obra = await obraRp.findOne({ where: { id: obraId } });

      if (!obra) throw new Error('No existe una obra con este id');
      if (!(await this.findTerceroEmpresa(obra.terceroId))) {
        throw new Error('No existe una obra con este id');
      }

      if (body.terceroId !== undefined) {
        await this.ensureTerceroEmpresa(body.terceroId);
        obra.terceroId = body.terceroId;
      }

      if (body.municipioId !== undefined) {
        await this.ensureMunicipio(body.municipioId);
        obra.municipioId = body.municipioId;
      }

      if (body.responsableId !== undefined) {
        const responsableId = this.decodeUsuarioId(body.responsableId, 'responsable');
        await this.ensureUsuarioEmpresa(responsableId, 'responsable');
        obra.responsableId = responsableId;
      }

      if (body.vendedorId !== undefined) {
        const vendedorId = this.decodeUsuarioId(body.vendedorId, 'vendedor');
        await this.ensureUsuarioEmpresa(vendedorId, 'vendedor');
        obra.vendedorId = vendedorId;
      }

      if (body.estadoCode !== undefined) {
        obra.estadoCode = estadoObraTypeFactory(body.estadoCode).getCode();
      }

      if (body.nombre !== undefined) obra.nombre = STRING_UTILITIES.trim(body.nombre);
      if (body.direccion !== undefined) obra.direccion = STRING_UTILITIES.trim(body.direccion);
      if (body.notas !== undefined) obra.notas = STRING_UTILITIES.trim(body.notas);

      await obraRp.save(obra);
      await this.qr.commitTransaction();

      return true;
    } catch (error: any) {
      await this.qr.rollbackTransaction();
      throw new Error(error.message);
    } finally {
      await this.qr.release();
    }
  }

  private decodeUsuarioId(id: string, label: string): number {
    return this.decodeId(id, label);
  }

  private decodeId(id: string, label: string): number {
    const decodedId = +RSA_SERVICES.decryptValue(id);
    if (!decodedId) throw new Error(`El id de ${label} no es valido`);
    return decodedId;
  }

  private async ensureMunicipio(municipioId: number): Promise<void> {
    const municipioRp = this.sharedConn.getRepository(MunicipioOrm);
    const municipio = await municipioRp.findOne({ where: { id: municipioId } });
    if (!municipio) throw new Error('No existe un municipio con este id');
  }

  private async ensureUsuarioEmpresa(usuarioId: number, label: string): Promise<void> {
    const usuarioRp = this.qr.manager.getRepository(UsuarioOrm);
    const usuario = await usuarioRp.findOne({
      where: { id: usuarioId, empresas: { codigo: this.auth.enterpriseCode } },
    });

    if (!usuario) throw new Error(`No existe un usuario ${label} con este id`);
  }

  private async ensureTerceroEmpresa(terceroId: number): Promise<void> {
    const tercero = await this.findTerceroEmpresa(terceroId);
    if (!tercero) throw new Error('No existe un tercero con este id');
  }

  private async findTerceroEmpresa(terceroId: number): Promise<TerceroOrm | undefined> {
    const usuarioRp = this.qr.manager.getRepository(UsuarioOrm);
    const usuarios = await usuarioRp.find({
      where: { empresas: { codigo: this.auth.enterpriseCode } },
      relations: { terceros: true },
    });

    return usuarios
      .flatMap(usuario => usuario.terceros ?? [])
      .find(tercero => tercero.id === terceroId);
  }
}
