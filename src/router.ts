import express, {Express, NextFunction, Request, Response} from "express";
import { Controller } from "./interfaces/controller";

class Router {
  private readonly router: express.Router;
    readonly app: Express;

  constructor() {
    this.router = express.Router();
    this.app = express();
    return this;
  }

  private api(
      controller: Controller,
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
      controller: Controller|((req: Request, res: Response, next: NextFunction)=> void),
      ...middlewares: any[]
  ) {
    this.actionResolver(controller, path, middlewares);
    if ("index" in controller && "show" in controller) {
      return this.app.use(path, ...middlewares, path === "/" ? controller.index : controller.show);
    }
    throw new Error("Controller must have index and show methods");
  }

  public post(
      path: string,
      controller: Controller|((req: Request, res: Response, next: NextFunction)=> void),
      ...middlewares: any[]
  ) {
    this.actionResolver(controller, path, middlewares)
    if ("store" in controller) {
      this.app.use(`${path}`, ...middlewares, controller.store);
    }
  }

  public put(path: string, controller: Controller|((req: Request, res: Response, next: NextFunction)=> void), ...middlewares: any[]) {
    this.actionResolver(controller, path, middlewares);
    if ("update" in controller) {
        this.app.use(`${path}`, ...middlewares, controller.update);
    }
  }

  public delete(path: string, controller: Controller|((req: Request, res: Response, next: NextFunction)=> void), ...middlewares: any[]) {
    this.actionResolver(controller, path, middlewares);
    if ("destroy" in controller) {
        this.app.use(`${path}`, ...middlewares, controller.destroy);
    }
  }

  public routes() {
    return this.router;
  }

  private actionResolver(controller: Controller|((req: Request, res: Response, next: NextFunction)=> void), path: string, middlewares: any[] = []) {
    if (typeof controller === "function"){
      return this.app.use(path, ...middlewares, controller);
    }
  }
}

export default new Router();
