import * as dotenv from 'dotenv';
dotenv.config();

const isTestEnvironment = process.env.NODE_ENV === 'test';

export default {
  name: 'Users Apps',
  version: '1.0',
  host: process.env.APP_HOST || 'localhost',
  environment: process.env.NODE_ENV || 'development',
  port: (isTestEnvironment ? process.env.TEST_APP_PORT : process.env.APP_PORT) || '3000',
};
