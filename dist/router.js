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
        if (path === "/")
            return this.router.get(path, ...middlewares, controller.index);
        return this.router.get(`${path}/:id`, ...middlewares, controller.show);
    }
    post(path, controller, ...middlewares) {
        this.router.post(path, ...middlewares, controller.store);
    }
    put(path, controller, ...middlewares) {
        this.router.put(`${path}/:id`, ...middlewares, controller.update);
    }
    delete(path, controller, ...middlewares) {
        this.router.delete(`${path}/:id`, ...middlewares, controller.destroy);
    }
    routes() {
        return this.router;
    }
}
exports.default = new Router();
//# sourceMappingURL=router.js.map