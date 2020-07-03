import http from "http";
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked';
const express = require('express');
import { Application } from 'express'
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
import {initRoutes} from '../api'
import {initDependencyInjector} from "./dependencyInjector";


export async function initApp() {
    console.log('Get loaders')

    initializeTransactionalContext()
    await initDependencyInjector()

    const app: Application = express();
    app.use(bodyParser.json())

    app.use(cookieParser())
    // Routes
    initRoutes(app)

    const server: http.Server = http.createServer(app)

    return {
        server
    }
}