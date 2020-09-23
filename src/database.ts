// import {Connection, createConnection} from "typeorm";
// import {User} from "./db";
// import config from "./config/";
//
//
// export function getConnection(): Promise<Connection> {
//
//     createConnection({
//         type: "mysql",
//         host: "localhost",
//         port: 3306,
//         username: "root",
//         password: "admin",
//         database: "test",
//         entities: [
//             User
//         ],
//         synchronize: true,
//         logging: false
//     }).then(connection => {
//         // here you can start to work with your entities
//     }).catch(error => console.log(error));
//
//     // return typeORMConnect({
//     //     type: "postgres",
//     //     url: `${config.dialect}://${config.username}:${config.pass}@${config.host}:${config.port}/${config.database}`,
//     //     synchronize: true,
//     //     entities: [
//     //         User,
//     //     ]
//     // })
// }
