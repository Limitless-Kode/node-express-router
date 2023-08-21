import Router from "./router";
import {NextFunction, Request, Response} from "express";
const http = require("http");

const port = process.env.PORT || 3005;
const env = process.env.NODE_ENV;

const server = http.createServer(Router.app);

class UserController {
    index(req: Request, res: Response, next: NextFunction){
        res.json({message: "Hello World from Index"});
    }
    show(req: Request, res: Response, next: NextFunction){
        res.json({message: "Hello World from Show"});
    }
    store(req: Request, res: Response, next: NextFunction){
        res.json({message: "Hello World from Store"});
    }
    update(req: Request, res: Response, next: NextFunction){
        res.json({message: "Hello World from Update"});
    }
    destroy(req: Request, res: Response, next: NextFunction){
        res.json({message: "Hello World from Destroy"});
    }
}

Router.apiResource('/you', new UserController());
Router.post('/me', (new UserController()).store);

server.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
