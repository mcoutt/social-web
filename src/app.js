// // import dependencyInjectorLoader from './' // '/dependencyInjector';
// import {Container} from "typedi";
// const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser')
// const initRoutes = require('../routes/index')
// import { Router } from 'express';
// import UserService from '../services/user'
// import GroupService from '../services/group'
//
//
// const db = require('../db/models')
//
// export default async ({app}) => {
//
//     // injecting the sequelize models into the DI container.
//     const userModel = {
//         name: 'userModel',
//         model: db.User,
//     }
//
//     const groupModel = {
//         name: 'groupModel',
//         model: db.Group
//     }
//
//     const usersGroupsModel = {
//         name: 'usersGroupsModel',
//         model: db.UserGroup
//     }
//     // It returns the agenda instance because it's needed in the subsequent loaders
//     // await dependencyInjectorLoader({
//     //     models: [
//     //         userModel,
//     //         groupModel,
//     //         usersGroupsModel
//     //     ],
//     // });
//
//     Container.set('UserService', new UserService())
//     Container.set('GroupService', new GroupService())
//     console.log('Dependency Injector loaded');
// };
