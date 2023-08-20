"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class Router {
    constructor() {
        this.router = express_1.default.Router();
        return this;
    }
    apiResource(path, controller, middlewares = []) {
        this.router.get(path, ...middlewares, controller.index);
        this.router.get(`${path}/:id`, ...middlewares, controller.show);
        this.router.post(path, ...middlewares, controller.store);
        this.router.put(`${path}/:id`, ...middlewares, controller.update);
        this.router.delete(`${path}/:id`, ...middlewares, controller.destroy);
    }
    get(path, ...middlewares) {
        this.router.get(path, ...middlewares);
    }
    post(path, ...middlewares) {
        this.router.post(path, ...middlewares);
    }
    put(path, ...middlewares) {
        this.router.put(path, ...middlewares);
    }
    delete(path, ...middlewares) {
        this.router.delete(path, ...middlewares);
    }
    all(path, ...middlewares) {
        this.router.all(path, ...middlewares);
    }
    routes() {
        return this.router;
    }
}
exports.default = new Router();
//# sourceMappingURL=router.js.map