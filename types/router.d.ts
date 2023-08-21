import express, { Express, NextFunction, Request, Response } from "express";
import { Controller } from "./interfaces/controller";
declare class Router {
    private readonly router;
    readonly app: Express;
    constructor();
    private api;
    apiResource(path: string, controller: Controller, middlewares?: any[]): void;
    get(path: string, controller: Controller | ((req: Request, res: Response, next: NextFunction) => void), ...middlewares: any[]): express.Express;
    post(path: string, controller: Controller | ((req: Request, res: Response, next: NextFunction) => void), ...middlewares: any[]): void;
    routes(): express.Router;
    private actionResolver;
}
declare const _default: Router;
export default _default;
