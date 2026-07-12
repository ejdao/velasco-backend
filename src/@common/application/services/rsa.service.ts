import NodeRSA from 'node-rsa';
import * as dotenv from 'dotenv';
import { ENVIRONMENTS } from '@env';
dotenv.config();

const encryptValue = (value: string | number): string => {
  if (ENVIRONMENTS.production) {
    const keyPublic = ENVIRONMENTS.rsa.ids.publicKey;
    let encrypted = keyPublic.encrypt(`${value}`, 'base64');
    encrypted = encrypted.replaceAll('+', '_').replaceAll('/', '.');
    return encrypted;
  } else return `${value}`;
};

const decryptValue = (encryptedValue: string): string => {
  const valueIsNumber = !isNaN(+encryptedValue);
  if (valueIsNumber) return encryptedValue;
  encryptedValue = encryptedValue.replaceAll('_', '+').replaceAll('.', '/');
  const keyPrivate = ENVIRONMENTS.rsa.ids.privateKey;
  const decrypt = keyPrivate.decrypt(encryptedValue, 'utf8');
  return decrypt;
};

const generateKeys = () => {
  const keys = new NodeRSA({ b: 512 });
  const publicKey = keys.exportKey('public');
  const privateKey = keys.exportKey('private');
  return { publicKey, privateKey };
};

export const RSA_SERVICES = {
  encryptValue,
  decryptValue,
  generateKeys,
};
