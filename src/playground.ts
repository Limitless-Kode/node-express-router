import Router from "./router";
import {NextFunction, Request, Response} from "express";
const http = require("http");

const port = process.env.PORT || 3005;
const env = process.env.NODE_ENV;

const server = http.createServer(Router.app);

class UserController {
    index(req: Request, res: Response, next: NextFunction){
        res.json({message: "Hello World from Index" + req.path});
    }
    show(req: Request, res: Response, next: NextFunction){
        res.json({message: "Hello World from Show" + req.params.id});
    }
    store(req: Request, res: Response, next: NextFunction){
        res.json({message: "Hello World from Store" + req.path});
    }
    update(req: Request, res: Response, next: NextFunction){
        res.json({message: "Hello World from Update" + req.params.id});
    }
    destroy(req: Request, res: Response, next: NextFunction){
        res.json({message: "Hello World from Destroy"});
    }
}


Router.apiResource('/you', new UserController());
Router.get('/me', (new UserController().index));
Router.get('/me/:id', (new UserController()).show);


server.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
