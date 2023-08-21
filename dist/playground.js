"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("./router"));
const http = require("http");
const port = process.env.PORT || 3005;
const env = process.env.NODE_ENV;
const server = http.createServer(router_1.default.app);
class UserController {
    index(req, res, next) {
        res.json({ message: "Hello World from Index" });
    }
    show(req, res, next) {
        res.json({ message: "Hello World from Show" });
    }
    store(req, res, next) {
        res.json({ message: "Hello World from Store" });
    }
    update(req, res, next) {
        res.json({ message: "Hello World from Update" });
    }
    destroy(req, res, next) {
        res.json({ message: "Hello World from Destroy" });
    }
}
router_1.default.apiResource('/you', new UserController());
router_1.default.post('/me', (new UserController()).store);
server.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
//# sourceMappingURL=playground.js.map