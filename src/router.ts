import express, {Express} from "express";
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

  public get(path: string, controller: Controller,...middlewares: any[]) {
    if(path === "/") return this.router.get(path, ...middlewares, controller.index);
    return this.router.get(`${path}/:id`, ...middlewares, controller.show);
  }

  public post(path: string, controller: Controller, ...middlewares: any[]) {
    this.router.post(path, ...middlewares, controller.store);
  }

  public put(path: string, controller: Controller, ...middlewares: any[]) {
    this.router.put(`${path}/:id`, ...middlewares, controller.update);
  }

  public delete(path: string, controller: Controller, ...middlewares: any[]) {
    this.router.delete(`${path}/:id`, ...middlewares, controller.destroy);
  }

  public routes() {
    return this.router;
  }
}

export default new Router();
