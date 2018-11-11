import { Request, Response } from "express";
import { HomeController } from "../controllers/HomeController";
import { JWTFactoryController } from "../controllers/JWTFactoryController";

// interface IRoutes {
//     homeController: HomeController;
//     register(app: Express.Application): void;
// }

export class Routes {

    public homeController: HomeController = new HomeController();
    private jwtFactoryController: JWTFactoryController = new JWTFactoryController()
    
    public register(app): void {   
        
        app.route("/")
            .get(this.homeController.index)

        app.route("/jwt-factory/api")
            .get(this.jwtFactoryController.getToken)
        
    }
}