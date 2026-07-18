import { CtmContextCode, CtmContextType, ctmContextTypeFactory } from '@common/domain/types';
import { ENVIRONMENTS } from '@env';
import { RSA_SERVICES } from './rsa.service';
import { jwtDecode } from 'jwt-decode';
import * as jwt from 'jsonwebtoken';
import { StringValue } from 'ms';

export interface AuthTokenI {
  jti: string;
  aud: string;
  sub: string;
  iss: CtmContextCode;
  rst: boolean;
  tcr: string;
  iat?: number;
  exp?: number;
}

export class AuthTokenDecoded {
  constructor(
    private id: number,
    private enterpriseCode: string,
    private document: string,
    private context: CtmContextType,
    private terceroId?: number,
    private createdAt?: Date,
    private expiredAt?: Date
  ) {}

  getId(): number {
    return this.id;
  }

  getEnterpriseCode(): string {
    return this.enterpriseCode;
  }

  getTerceroId(): number | undefined {
    return this.terceroId;
  }

  getDocument(): string {
    return this.document;
  }

  getContext(): CtmContextType {
    return this.context;
  }

  getCreatedAt(): Date | undefined {
    return this.createdAt;
  }

  getExpiredAt(): Date | undefined {
    return this.expiredAt;
  }
}

const _tokenDateToDate = (date: number | undefined): Date | undefined => {
  const el = new Date(0);
  return date ? new Date(el.setUTCSeconds(date)) : undefined;
};

const decode = (token: string): AuthTokenDecoded => {
  try {
    const tokenDecodedFromRsa = RSA_SERVICES.decryptValue(token);
    const tokDecoded: AuthTokenI = jwtDecode(tokenDecodedFromRsa);

    return new AuthTokenDecoded(
      +RSA_SERVICES.decryptValue(tokDecoded.jti),
      tokDecoded.aud,
      tokDecoded.sub,
      ctmContextTypeFactory(tokDecoded.iss),
      tokDecoded.tcr ? +RSA_SERVICES.decryptValue(tokDecoded.tcr) : undefined,
      _tokenDateToDate(tokDecoded.iat),
      _tokenDateToDate(tokDecoded.exp)
    );
  } catch (error: any) {
    throw new Error('Token not found or invalid');
  }
};

export const generate = (pl: {
  usuarioId: number;
  empresaCode: string;
  isPasswordReiniciada: boolean;
  documento: string;
  terceroId: number;
  context: CtmContextType;
  expiresIn: StringValue | number;
}) => {
  const payload: AuthTokenI = {
    jti: RSA_SERVICES.encryptValue(pl.usuarioId),
    aud: pl.empresaCode,
    rst: pl.isPasswordReiniciada,
    sub: pl.documento,
    tcr: RSA_SERVICES.encryptValue(pl.terceroId),
    iss: pl.context.getCode(),
  };

  return jwt.sign(payload, ENVIRONMENTS.secretKey, {
    expiresIn: pl.expiresIn,
    algorithm: 'HS512',
  });
};

export const JWT_SERVICES = {
  decode,
  generate,
};
