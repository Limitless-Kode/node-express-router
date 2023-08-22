import express, {Express, NextFunction, Request, Response} from "express";
import { Controller } from "./interfaces/controller";


type Invoker = "get"|"post"|"put"|"delete";

class Router {
  private readonly router: express.Router;
  readonly app: Express;

  constructor() {
    this.router = express.Router();
    this.app = express();
    return this;
  }

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

  public apiResource(
      path: string,
      controller: Controller,
      middlewares: any[] = []
  ) {
    this.app.use(path, this.api(controller, middlewares));
  }

  public get(
      path: string,
      controller: ((req: Request, res: Response, next: NextFunction)=> void),
      ...middlewares: any[]
  ) {
    this.actionResolver("get", controller, path, middlewares);
  }

  public post(
      path: string,
      controller: ((req: Request, res: Response, next: NextFunction)=> void),
      ...middlewares: any[]
  ) {
    this.actionResolver("post", controller, path, middlewares);
  }

  public put(path: string, controller: ((req: Request, res: Response, next: NextFunction)=> void), ...middlewares: any[]) {
    this.actionResolver("put",controller, path, middlewares);
  }

  public delete(path: string, controller: ((req: Request, res: Response, next: NextFunction)=> void), ...middlewares: any[]) {
    this.actionResolver("delete",controller, path, middlewares);
  }

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
