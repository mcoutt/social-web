import { Application, Handler } from 'express';
import {initUserRoutes} from "./routes/user";
import {requestMiddleware} from "./middlewares/request";
import {initGroupRoutes} from "./routes/group";
import {Route} from "../types";


export function initRoutes(app: Application): void {

    const routes = [
        ...initUserRoutes(),
        ...initGroupRoutes()
    ];
    for (const route of routes) {
        const path: string = `/api${route.path}`;
        const middleware: Handler[] = [requestMiddleware];
        // if (route.middleware) {
        //     middleware.push(route.middleware);
        // }
        app[route.method](path, middleware, route.handler);
    }
}
