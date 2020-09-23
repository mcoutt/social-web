import {ErrorRequestHandler, Handler, Request as ExpressRequest, RequestHandler} from 'express'


export interface Route {
    method: HTTP_METHOD;
    path: string;
    uniquePath?: boolean;
    middleware?: Handler;
    handler: Handler;

    // middleware?: (RequestHandler | ErrorRequestHandler)[];
    // handler: RequestHandler
}

export interface modelType {
    name: string,
    model: object
}

export type HTTP_METHOD = "get" | "post" | "put" | "patch" | "delete"

export type GroupPermissionsType = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES'
