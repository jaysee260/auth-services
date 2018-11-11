import * as express from "express";

interface IController {
    index(req: Request, res: Response, next?): void;
}

abstract class Controller implements IController {

    public index(req: Request, res: Response): void {
        
    }
}

class HomeController extends Controller {
    
}

// A router should have an Index of routes with at least one Home Route