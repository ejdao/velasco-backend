import { TerceroOrm } from '@orm/seguridad';
import { estadoUsuarioTypeFactory } from '@ctypes/general/usuario';
import { FetchClienteRes } from '@general/application/responses';
import { entidadOrmToRecursoRes } from '@shared/common';

export const terceroOrmToFetchClienteResFactory = (data: TerceroOrm): FetchClienteRes => ({
  id: data.id,
  nit: data.nit,
  nombre: data.nombre,
  direccion: data.direccion,
  municipio: entidadOrmToRecursoRes(data.municipio, false),
  estado: estadoUsuarioTypeFactory(data.estadoCode) as any,
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
