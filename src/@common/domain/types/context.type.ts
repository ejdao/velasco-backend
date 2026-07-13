import { CtmType } from './base.type';

export enum CtmContexts {
  DEFAULT = 'DEFAULT',
}

export type CtmContextCode = CtmContexts | 'SHARED';

export class CtmContextType extends CtmType<CtmContextCode> {}

const DEFAULT = new CtmContextType(CtmContexts.DEFAULT, 'Default BBDD');
const SHARED = new CtmContextType('SHARED', 'Shared BBDD');

export const ctmContextTypeFactory = (code: CtmContextCode) => {
  switch (code) {
    case CtmContexts.DEFAULT:
      return DEFAULT;
    case 'SHARED':
      return SHARED;
    default:
      return DEFAULT;
  }
};

export const CTM_CONTEXTS = { SHARED, DEFAULT };

export const CTM_CONTEXTS_COMMON_VALUES = [SHARED];

export const CTM_CONTEXTS_AUTHS_VALUES = [DEFAULT];
