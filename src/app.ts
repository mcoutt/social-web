import 'reflect-metadata';
const express = require('express')
import config from '../config';
import * as dbConfig from '../typeormConfig'
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked';
import {createConnection} from "typeorm";
import {config as configEnv} from "dotenv";

configEnv();


createConnection(dbConfig.config).then(async connection => {
    console.log('Start connections')
    initializeTransactionalContext()
    const app = express();
    await connection.runMigrations();
    await require("./loaders").default({ expressApp: app })

    app.listen(config.port, (err: any) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Server started at http://${config.host}:${config.port}`);
    })

}).catch(error => console.log(error));
