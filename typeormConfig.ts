import {ConnectionOptions} from "typeorm";
import * as path from "path";
import * as dotEnv from 'dotenv'

console.log(path.resolve(__dirname, 'entity/**/*.ts'))

const result = dotEnv.config({path: './.env'});

if (result.error) {
    throw result.error
}

export let config: ConnectionOptions = {
    type: "postgres",
    host: process.env.NODE_ENV === "test" ? process.env.TEST_DB_HOST : process.env.TYPEORM_HOST,
    "port": process.env.NODE_ENV === "test" ? +process.env.TEST_DB_PORT : +process.env.TYPEORM_PORT,
    "username": process.env.NODE_ENV === "test" ? process.env.TEST_DB_USERNAME : process.env.TYPEORM_USERNAME,
    "password": process.env.NODE_ENV === "test" ? process.env.TEST_DB_PASSWORD : process.env.TYPEORM_PASSWORD,
    "database": process.env.NODE_ENV === "test" ? process.env.TEST_DB_NAME : process.env.TYPEORM_DATABASE,
    "synchronize": true,
    "logging": false,
    "dropSchema": process.env.NODE_ENV === "test" ? true : false,
    "entities": [
        __dirname + "/src/entity/**/*.ts"
    ],
    "migrations": [
        __dirname + "/build/src/migration/**/*.js"
    ],
    "subscribers": [
        __dirname + "/src/subscriber/*.ts"
    ],
    "cli": {
        "entitiesDir": __dirname + "/src/db/entity",
        "migrationsDir": __dirname + "/src/db/migration",
        "subscribersDir": __dirname + "/src/db/subscriber"
    }
}
