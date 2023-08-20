import { Request, Response, NextFunction } from "express";

export interface Controller {
  index(req: Request, res: Response, next: NextFunction): void;
  show(req: Request, res: Response, next: NextFunction): void;
  store(req: Request, res: Response, next: NextFunction): void;
  update(req: Request, res: Response, next: NextFunction): void;
  destroy(req: Request, res: Response, next: NextFunction): void;
}
