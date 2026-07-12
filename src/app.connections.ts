import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { ORM_ENTITIES } from './app.entities';
import { CTM_CONTEXTS, CtmContextType } from '@common/domain/types';
dotenv.config();

const type = 'postgres';
const port = 5432;

const synchronize = false;
const entities = ORM_ENTITIES;

export const DEFAULT_DES = new DataSource({
  username: process.env.DEFAULT_USERNAME_DB,
  password: process.env.DEFAULT_PASS_DB,
  database: process.env.DEFAULT_NAME_DB,
  host: process.env.DEFAULT_HOST_DB,
  entities,
  synchronize,
  type,
  port,
});

export const DATASOURCES = [
  // --- //
  { ctx: CTM_CONTEXTS.DEFAULT, ds: DEFAULT_DES },
];

export const switchConn = (context: CtmContextType) => {
  switch (context) {
    case CTM_CONTEXTS.DEFAULT:
      return DEFAULT_DES;
  }
};
