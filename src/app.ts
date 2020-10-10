import 'reflect-metadata';
const express = require('express')
import config from '../config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import {createConnection} from "typeorm";
import {config as configEnv} from "dotenv";
configEnv();
import {join} from 'path';


createConnection(
    // {
    // type: "postgres",
    // host: process.env.TYPEORM_HOST.toString(),
    // port: parseInt(process.env.TYPEORM_PORT),
    // username: process.env.TYPEORM_USERNAME.toString(),
    // password: process.env.TYPEORM_PASSWORD.toString(),
    // database: process.env.TYPEORM_DATABASE.toString(),
    // migrations: [
    //     __dirname + "src/migration/*{.ts,.js}"
    // ],
    // entities: [
    //     __dirname + "src/entity/*{.ts,.js}"
    // ],
    // synchronize: true,
// }
).then(async connection => {
    console.log('Start connections')
    const app = express();

    await require("./loaders").default({ expressApp: app })

    app.listen(config.port, (err: any) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Server started at http://${config.host}:${config.port}`);
    })

}).catch(error => console.log(error));
