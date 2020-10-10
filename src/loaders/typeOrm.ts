// import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
// import {User} from "../entity/User";
// import {Group} from "../entity/Group";
// import {createConnection} from "typeorm";
// import {config as configEnv} from "dotenv";
// configEnv();
// import {join} from 'path';
//
//
// export default async () => {
//     console.log('Start connections')
//
//     createConnection({
//         type: "postgres",
//         host: process.env.TYPEORM_HOST.toString(),
//         port: parseInt(process.env.TYPEORM_PORT),
//         username: process.env.TYPEORM_USERNAME.toString(),
//         password: process.env.TYPEORM_PASSWORD.toString(),
//         database: process.env.TYPEORM_DATABASE.toString(),
//         migrations: [
//             __dirname + "../db/migrations/*.ts"
//         ],
//         entities: [
//             __dirname + "../db/entities/*{.ts,.js}"
//         ],
//         synchronize: true,
//     }).then(connection => {
//         return connection
//     }).catch(error => console.log(error));
// }
