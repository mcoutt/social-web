import * as express from "express";
import {Container} from "typedi";


export const requestMiddleware: express.RequestHandler = (req: express.Request, res: express.Response, next: express.NextFunction) => {

    Container.get('groupModel')

    console.log("requestMiddleware", "applied");

    next();
};
