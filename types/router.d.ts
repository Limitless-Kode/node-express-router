import express, { Express } from "express";
import { Controller } from "./interfaces/controller";
declare class Router {
    private readonly router;
    readonly app: Express;
    constructor();
    private api;
    apiResource(path: string, controller: Controller, middlewares?: any[]): void;
    get(path: string, controller: Controller, ...middlewares: any[]): express.Router;
    post(path: string, controller: Controller, ...middlewares: any[]): void;
    put(path: string, controller: Controller, ...middlewares: any[]): void;
    delete(path: string, controller: Controller, ...middlewares: any[]): void;
    routes(): express.Router;
}
declare const _default: Router;
export default _default;
