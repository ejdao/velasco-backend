import { CtmType } from './base.type';

export enum CtmContexts {
  DEFAULT = 'DEFAULT',
}

export type CtmContextCode = CtmContexts;

export class CtmContextType extends CtmType<CtmContextCode> {}

const DEFAULT = new CtmContextType(CtmContexts.DEFAULT, 'Default BBDD');

export const ctmContextTypeFactory = (code: CtmContextCode) => {
  switch (code) {
    case CtmContexts.DEFAULT:
      return DEFAULT;
    default:
      return DEFAULT;
  }
};

export const CTM_CONTEXTS = { DEFAULT };

export const CTM_CONTEXTS_AUTHS_VALUES = [DEFAULT];
