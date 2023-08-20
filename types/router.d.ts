import express from "express";
import { Controller } from "./interfaces/controller";
declare class Router {
    private router;
    constructor();
    apiResource(path: string, controller: Controller, middlewares?: any[]): void;
    get(path: string, ...middlewares: any[]): void;
    post(path: string, ...middlewares: any[]): void;
    put(path: string, ...middlewares: any[]): void;
    delete(path: string, ...middlewares: any[]): void;
    all(path: string, ...middlewares: any[]): void;
    routes(): express.Router;
}
declare const _default: Router;
export default _default;
