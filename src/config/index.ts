import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import {User, Group} from "../db";
import {config as configEnv} from "dotenv";
configEnv();


const typeOrmConfig: PostgresConnectionOptions = {
    "type": "postgres",
    "host": process.env.TYPEORM_HOST.toString(),
    "port": parseInt(process.env.TYPEORM_PORT),
    "username": process.env.TYPEORM_USERNAME.toString(),
    "password": process.env.TYPEORM_PASSWORD.toString(),
    "database": process.env.TYPEORM_DATABASE.toString(),
    "synchronize": true,
    "logging": false,
    'uuidExtension': 'pgcrypto',
    entities: [
        User,
        Group
    ],
}

export { typeOrmConfig };

