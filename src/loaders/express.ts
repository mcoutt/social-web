import * as express from 'express'
import {initRoutes} from "../api";


export default ({app}: {app: express.Application}) => {


    // Routes
    initRoutes(app)

}
