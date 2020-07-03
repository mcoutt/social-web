import 'reflect-metadata';
import { createConnection} from "typeorm";
import {initApp} from "./loaders";
import { typeOrmConfig} from './config';


createConnection(typeOrmConfig)
    .then(async (): Promise<void> => {
        // await Setting.seedDefaultSettings();

        console.log('PG connected.');

        const { server } = await initApp();

        server.listen(process.env.PORT)

    })
    .catch(err => console.log(err))


    // await conn.close();
    // console.log('PG connection closed.');
