import { Request, Response } from "express";
import * as config from "../../config/jwt.config.json";
import * as jwt from "jsonwebtoken";

export class JWTFactoryController {

    public getToken(req: Request, res: Response) {
        const {
            issuer,
            subject,
            jwtid,
            secret,
            expiresIn
         } = config;

         let payload: number = Date.now();
         let token: string = jwt.sign({ payload }, secret, { issuer, subject, jwtid, expiresIn });
     
         const msg: string = "This is where you can get a JWT.";
         res.status(200).send({ msg, token });
    }

}