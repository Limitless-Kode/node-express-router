import express, { Express, NextFunction, Request, Response } from "express";
import { Controller } from "./interfaces/controller";
/**
 * Represents a router that provides utility methods for creating API routes using Express.
 */
declare class Router {
    private readonly router;
    readonly app: Express;
    /**
     * Creates an instance of Router.
     */
    constructor();
    /**
     * Creates API endpoints for the specified controller.
     *
     * @param {Controller} controller - The controller object to handle API requests.
     * @param {any[]} [middlewares=[]] - An array of middleware functions to apply to the routes.
     * @returns {express.Router} The Express router with the defined API endpoints.
     */
    private api;
    /**
     * Creates a resource-based API using the specified controller and path.
     *
     * @param {string} path - The base path for the API resource.
     * @param {Controller} controller - The controller object to handle API requests.
     * @param {any[]} [middlewares=[]] - An array of middleware functions to apply to the routes.
     */
    apiResource(path: string, controller: Controller, middlewares?: any[]): void;
    /**
     * Creates a GET route for the specified path and controller.
     *
     * @param {string} path - The path for the GET route.
     * @param {function} controller - The controller function to handle the route.
     * @param {any[]} middlewares - An array of middleware functions to apply to the route.
     */
    get(path: string, controller: ((req: Request, res: Response, next: NextFunction) => void), ...middlewares: any[]): void;
    /**
     * Creates a POST route for the specified path and controller.
     *
     * @param {string} path - The path for the POST route.
     * @param {function} controller - The controller function to handle the route.
     * @param {any[]} middlewares - An array of middleware functions to apply to the route.
     */
    post(path: string, controller: ((req: Request, res: Response, next: NextFunction) => void), ...middlewares: any[]): void;
    /**
     * Creates a PUT route for the specified path and controller.
     *
     * @param {string} path - The path for the PUT route.
     * @param {function} controller - The controller function to handle the route.
     * @param {any[]} middlewares - An array of middleware functions to apply to the route.
     */
    put(path: string, controller: ((req: Request, res: Response, next: NextFunction) => void), ...middlewares: any[]): void;
    /**
     * Creates a DELETE route for the specified path and controller.
     *
     * @param {string} path - The path for the DELETE route.
     * @param {function} controller - The controller function to handle the route.
     * @param {any[]} middlewares - An array of middleware functions to apply to the route.
     */
    delete(path: string, controller: ((req: Request, res: Response, next: NextFunction) => void), ...middlewares: any[]): void;
    /**
     * Retrieves the underlying Express router with defined routes.
     *
     * @returns {express.Router} The Express router with defined routes.
     */
    routes(): express.Router;
    private actionResolver;
}
declare const _default: Router;
export default _default;
