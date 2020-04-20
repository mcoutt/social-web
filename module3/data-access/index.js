import dependencyInjectorLoader from './dependencyInjector';
import {Container} from "typedi";
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const initRoutes = require('../routes/index')
import { Router } from 'express';
import UserService from '../services/user'


const db = require('../db/models/index')

export default async ({app}) => {
    await db.sequelize.sync();

    app.use(bodyParser.json())
    app.use(cookieParser())

    // Routes
    const router = Router()
    app.use('/api', router);
    initRoutes(router)

    // injecting the sequelize models into the DI container.
    const userModel = {
        name: 'userModel',
        model: db.Users,
    };

    // It returns the agenda instance because it's needed in the subsequent loaders
    await dependencyInjectorLoader({
        models: [
            userModel,
        ],
    });
    Container.set('UserService', new UserService())
    console.log('Dependency Injector loaded');
};

