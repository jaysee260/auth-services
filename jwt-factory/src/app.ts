const { NODE_ENV:env } = process.env;
import * as express from "express";
import * as bodyParser from "body-parser";
import * as logger from "morgan"
// import * as mongoose from "mongoose";
import { Routes } from "./routes";

class App {

    public app: express.Application;
    private routes: Routes = new Routes();
    private env: string;
    // private readonly _dbUrl: string = "mongodb://localhost/CRMdb";

    constructor(env?: string) {
        this.init(env);
    }
    
    private init(env: string): void {
        this.app = express();
        this.config(env);
        this.routes.register(this.app);
        // this.dbSetup();
    }

    private config(env?: string): void{
        this.env = env ? env : "development";
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        if (this.env === "development") {
            this.app.use(logger("dev"));
        }
    }

    // private dbSetup(): void{
    //     mongoose.Promise = global.Promise;
    //     mongoose.connect(this._dbUrl);    
    // }

}

export default new App(env).app;