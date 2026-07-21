import { TerceroOrm } from '@orm/seguridad';
import { estadoUsuarioTypeFactory } from '@ctypes/general/usuario';
import { tipoPersonaTerceroTypeFactory, tipoTerceroTypeFactory } from '@ctypes/general/tercero';
import { FetchTerceroRes } from '@general/application/responses';
import { entidadOrmToRecursoRes } from '@shared/common';

export const terceroOrmToFetchTerceroResFactory = (data: TerceroOrm): FetchTerceroRes => ({
  id: data.id,
  nit: data.nit,
  nombre: data.nombre,
  direccion: data.direccion,
  municipio: entidadOrmToRecursoRes(data.municipio, false),
  estado: estadoUsuarioTypeFactory(data.estadoCode) as any,
  tipo: tipoTerceroTypeFactory(data.tipoCode) as any,
  tipoPersona: tipoPersonaTerceroTypeFactory(data.tipoPersonaCode) as any,
  responsables: (data.usuarios ?? []).map(usuario => ({
    id: usuario.id,
    documento: usuario.documento,
    primerNombre: usuario.primerNombre,
    segundoNombre: usuario.segundoNombre,
    primerApellido: usuario.primerApellido,
    segundoApellido: usuario.segundoApellido,
    email: usuario.email,
    telefono1: usuario.numeroContactoPrincipal,
    telefono2: usuario.numeroContactoSecundario,
  })),
});
