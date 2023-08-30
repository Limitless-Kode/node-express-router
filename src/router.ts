import express, {Express, NextFunction, Request, Response} from "express";
import { Controller } from "./interfaces/controller";


type Invoker = "get"|"post"|"put"|"delete";

/**
 * Represents a router that provides utility methods for creating API routes using Express.
 */
class Router {
  private readonly router: express.Router;
  readonly app: Express;

  /**
   * Creates an instance of Router.
   */
  constructor() {
    this.router = express.Router();
    this.app = express();
  }

  /**
   * Creates API endpoints for the specified controller.
   *
   * @param path
   * @param {Controller} controller - The controller object to handle API requests.
   * @param {any[]} [middlewares=[]] - An array of middleware functions to apply to the routes.
   * @returns {express.Router} The Express router with the defined API endpoints.
   */
  private api(
      controller: any,
      middlewares: any[] = []
  ){
    this.router.get('/', ...middlewares, controller.index);
    this.router.get(`/:id`, ...middlewares, controller.show);
    this.router.post('/', ...middlewares, controller.store);
    this.router.put(`/:id`, ...middlewares, controller.update);
    this.router.delete(`/:id`, ...middlewares, controller.destroy);

    return this.router;
  }

  /**
   * Creates a group of routes with the specified path and middleware functions.
   * @param path
   * @param middlewares
   * @param callback
   */
  public group(path: string, middlewares: any[] = [], callback: (router: any)=> void){
    this.app.use(path, ...middlewares, this.router);
    callback(this.router);
  }

  /**
   * Creates a resource-based API using the specified controller and path.
   *
   * @param {string} path - The base path for the API resource.
   * @param {Controller} controller - The controller object to handle API requests.
   * @param {any[]} [middlewares=[]] - An array of middleware functions to apply to the routes.
   */
    // public apiResource(
    //     path: string,
    //     controller: any,
    //     middlewares: any[] = []
    // ){
    //   this.app.use(path, this.api(controller, middlewares));
    // }
  public apiResource(
      path: string,
      controller: any,
      middlewares: any[] = []
  ){
    this.api(controller, middlewares); // Add the routes directly to the router
    this.app.use(path, this.router); // Use the router for the specified path
  }

  /**
   * Creates a GET route for the specified path and controller.
   *
   * @param {string} path - The path for the GET route.
   * @param {function} controller - The controller function to handle the route.
   * @param {any[]} middlewares - An array of middleware functions to apply to the route.
   */
  public get(
      path: string,
      controller: ((req: Request, res: Response, next: NextFunction)=> void),
      middlewares: any[]
  ) {
    this.actionResolver("get", controller, path, ...middlewares);
  }

  /**
   * Creates a POST route for the specified path and controller.
   *
   * @param {string} path - The path for the POST route.
   * @param {function} controller - The controller function to handle the route.
   * @param {any[]} middlewares - An array of middleware functions to apply to the route.
   */
  public post(
      path: string,
      controller: ((req: Request, res: Response, next: NextFunction)=> void),
      middlewares: any[]
  ) {
    this.actionResolver("post", controller, path, ...middlewares);
  }

  /**
   * Creates a PUT route for the specified path and controller.
   *
   * @param {string} path - The path for the PUT route.
   * @param {function} controller - The controller function to handle the route.
   * @param {any[]} middlewares - An array of middleware functions to apply to the route.
   */
  public put(path: string, controller: ((req: Request, res: Response, next: NextFunction)=> void), middlewares: any[]) {
    this.actionResolver("put",controller, path, ...middlewares);
  }

  /**
   * Creates a DELETE route for the specified path and controller.
   *
   * @param {string} path - The path for the DELETE route.
   * @param {function} controller - The controller function to handle the route.
   * @param {any[]} middlewares - An array of middleware functions to apply to the route.
   */
  public delete(path: string, controller: ((req: Request, res: Response, next: NextFunction)=> void), middlewares: any[]) {
    this.actionResolver("delete",controller, path, ...middlewares);
  }

  /**
   * Retrieves the underlying Express router with defined routes.
   *
   * @returns {express.Router} The Express router with defined routes.
   */
  public routes() {
    return this.router;
  }

  private actionResolver(invoker: Invoker, controller: ((req: Request, res: Response, next: NextFunction)=> void), path: string, middlewares: any[] = []) {
    let resolved = false;
    if (typeof controller === "function"){
      switch (invoker) {
        case "get":
            resolved = true;
            this.app.get(path, ...middlewares, controller);
            break;
        case "post":
            resolved = true;
            this.app.post(path, ...middlewares, controller);
            break;
        case "put":
            resolved = true;
            this.app.put(path, ...middlewares, controller);
            break;
        case "delete":
            resolved = true;
            this.app.delete(path, ...middlewares, controller);
            break;
      }
    }
    return resolved;
  }

}

export default new Router();
