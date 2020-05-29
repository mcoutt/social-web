import {Container} from "typedi";
// import UserService from '../services/user'
// import GroupService from '../services/group'
import dependencyInjectorLoader from "./dependencyInjectorLoader";


const db = require('../db')

export const initDependencyInjector = async (): Promise<void> => {

    console.log('Load DI')

    // injecting the sequelize models into the DI container.
    const userModel = {
        name: 'userModel',
        model: db.User,
    }

    const groupModel = {
        name: 'groupModel',
        model: db.Group
    }

    // It returns the agenda instance because it's needed in the subsequent loaders
    await dependencyInjectorLoader({
        models: [
            userModel,
            groupModel,
        ],
    });

    // Container.set('UserService', new UserService())
    // Container.set('GroupService', new GroupService())
    console.log('Dependency Injector loaded');
};
