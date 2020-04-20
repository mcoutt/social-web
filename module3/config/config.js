require('dotenv').config();

const config = {};

config.port = process.env.PORT || 3000;


// Database
config.db = {
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME || 'user',
    pass: process.env.DATABASE_PASSWORD || 'user',
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT || '5432',
    dialect: 'postgres',
  };


module.exports = config;
