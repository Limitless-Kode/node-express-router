import express from "express";
import { Controller } from "./interfaces/controller";

class Router {
  private router: express.Router;
  constructor() {
    this.router = express.Router();
    return this;
  }

  public apiResource(
    path: string,
    controller: Controller,
    middlewares: any[] = []
  ) {
    this.router.get(path, ...middlewares, controller.index);
    this.router.get(`${path}/:id`, ...middlewares, controller.show);
    this.router.post(path, ...middlewares, controller.store);
    this.router.put(`${path}/:id`, ...middlewares, controller.update);
    this.router.delete(`${path}/:id`, ...middlewares, controller.destroy);
  }

  public get(path: string, ...middlewares: any[]) {
    this.router.get(path, ...middlewares);
  }

  public post(path: string, ...middlewares: any[]) {
    this.router.post(path, ...middlewares);
  }

  public put(path: string, ...middlewares: any[]) {
    this.router.put(path, ...middlewares);
  }

  public delete(path: string, ...middlewares: any[]) {
    this.router.delete(path, ...middlewares);
  }

  public all(path: string, ...middlewares: any[]) {
    this.router.all(path, ...middlewares);
  }

  public routes() {
    return this.router;
  }
}

export default new Router();
