import * as express from 'express'
const bodyParser = require('body-parser')
import {initRoutes} from "../api";


export default ({app}: {app: express.Application}) => {

    // parse application/json
    app.use(bodyParser.json())

    // Routes
    initRoutes(app)

}
