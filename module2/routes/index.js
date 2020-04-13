import initUserRoutes from './user'


const initRoutes = (router) => {
    initUserRoutes(router)

    return router
}

module.exports = initRoutes