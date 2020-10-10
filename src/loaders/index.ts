import expressLoader from './express'
// import typeOrmConnection from './typeOrm'
import dependencyInjectorLoader from "./dependencyInjector";

const User = require('../entity/User')
const Group = require('../entity/Group')


export default async ({ expressApp }) => {
    // const connection = await typeOrmConnection();

    console.log('Start loaders')

    // injecting the sequelize models into the DI container.
    const userModel = {
        name: 'userModel',
        model: User,
    }

    const groupModel = {
        name: 'groupModel',
        model: Group
    }


    // It returns the agenda instance because it's needed in the subsequent loaders
    dependencyInjectorLoader({
        models: [
            userModel,
            groupModel,
        ],
    });

    await expressLoader({ app: expressApp });
    console.info('Loaders complete');
}
