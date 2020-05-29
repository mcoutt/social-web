// import {Handler, Response} from "express";
// import {Request, Route} from "../../../types";
//
//
// export function initUserRoutes(): Route[] {
//     const render: Handler = (req: Request, res: Response): void => {
//         res.render("./index.ejs",
//             {host: process.env.HOST, stylesheet: "dashboard.css", script: "dashboard.js", title: "Dashboard"});
//         req.release();
//     };
//
//     const renderTerms: Handler = (req: Request, res: Response): void => {
//         res.redirect("/dashboard");
//         req.release();
//     };
//
//     return [
//         {
//             method: "get",
//             path: "/dashboard*",
//             uniquePath: true,
//             handler: render,
//         },
//         {
//             method: 'GET',
//             path: "/terms-conditions",
//             uniquePath: true,
//             handler: renderTerms
//         },
//     ];
// }
