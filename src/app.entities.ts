import { ORM_ALQ_MAQ_ENTITIES } from '@orm/alquiler-maquinaria';
import { ORM_SEG_ENTITIES } from '@orm/seguridad';

export const ORM_ENTITIES = [
  // --- //
  ...ORM_SEG_ENTITIES,
  ...ORM_ALQ_MAQ_ENTITIES,
];
