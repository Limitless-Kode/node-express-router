"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class Router {
    constructor() {
        this.router = express_1.default.Router();
        this.app = (0, express_1.default)();
        return this;
    }
    api(controller, middlewares = []) {
        this.router.get('/', ...middlewares, controller.index);
        this.router.get(`/:id`, ...middlewares, controller.show);
        this.router.post('/', ...middlewares, controller.store);
        this.router.put(`/:id`, ...middlewares, controller.update);
        this.router.delete(`/:id`, ...middlewares, controller.destroy);
        return this.router;
    }
    apiResource(path, controller, middlewares = []) {
        this.app.use(path, this.api(controller, middlewares));
    }
    get(path, controller, ...middlewares) {
        this.actionResolver(controller, path, middlewares);
        if ("index" in controller && "show" in controller) {
            return this.app.use(path, ...middlewares, path === "/" ? controller.index : controller.show);
        }
        throw new Error("Controller must have index and show methods");
    }
    post(path, controller, ...middlewares) {
        this.actionResolver(controller, path, middlewares);
        if ("store" in controller) {
            this.app.use(`${path}`, ...middlewares, controller.store);
        }
    }
    // public put(path: string, controller: Controller|((req: Request, res: Response, next: NextFunction)=> void), ...middlewares: any[]) {
    //   this.app.use(`${path}`, ...middlewares, controller.update);
    // }
    //
    // public delete(path: string, controller: Controller|((req: Request, res: Response, next: NextFunction)=> void), ...middlewares: any[]) {
    //   this.app.use(`${path}`, ...middlewares, controller.destroy);
    // }
    routes() {
        return this.router;
    }
    actionResolver(controller, path, middlewares = []) {
        if (typeof controller === "function") {
            return this.app.use(path, ...middlewares, controller);
        }
    }
}
exports.default = new Router();
//# sourceMappingURL=router.js.map