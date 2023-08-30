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
        res.json({message: "Hello World from Show/" + req.params.id});
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

class YouController {
    index(req: Request, res: Response, next: NextFunction){
        res.json({message: "You Controller Response Index " + req.path});
    }
    show(req: Request, res: Response, next: NextFunction){
        res.json({message: "You Controller Response Show / " + req.params.id});
    }
    store(req: Request, res: Response, next: NextFunction){
        res.json({message: "You Controller Response Store " + req.path});
    }
    update(req: Request, res: Response, next: NextFunction){
        res.json({message: "You Controller Response Update " + req.params.id});
    }
    destroy(req: Request, res: Response, next: NextFunction){
        res.json({message: "You Controller Response Destroy"});
    }
}


Router.apiResource('/you', new YouController());


Router.group('/api', [], (router: any) => {
    router.get('/me', (new UserController().index));
    router.get('/me/:id', (new YouController()).show);
});

server.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
