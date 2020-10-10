import * as dotenv from 'dotenv';
import {join} from 'path';
dotenv.config();

const isTestEnvironment = process.env.NODE_ENV === 'test';

export default {
  name: 'Users Apps',
  version: '1.0',
  host: process.env.APP_HOST || 'localhost',
  environment: process.env.NODE_ENV || 'development',
  port: (isTestEnvironment ? process.env.TEST_APP_PORT : process.env.APP_PORT) || '3000',
//   db: {
//     host: (isTestEnvironment ? process.env.TEST_DB_HOST : process.env.TYPEORM_HOST),
//     port: (isTestEnvironment ? process.env.TEST_DB_PORT : process.env.TYPEORM_PORT),
//     username: (isTestEnvironment ? process.env.TEST_DB_USERNAME : process.env.TYPEORM_USERNAME),
//     password: (isTestEnvironment ? process.env.TEST_DB_PASSWORD : process.env.TYPEORM_PASSWORD),
//     database: (isTestEnvironment ? process.env.TEST_DB_NAME : process.env.TYPEORM_DATABASE),
//   },
//   logging: {
//     dir: process.env.LOGGING_DIR || 'logs',
//     level: process.env.LOGGING_LEVEL || 'debug'
//   },
//   entities: [
//       join(__dirname, 'src', 'entity', '*{.ts,.js}')],
//   migrations: [
//     join(__dirname, 'src', 'migration', '*{.ts,.js}')]
};
