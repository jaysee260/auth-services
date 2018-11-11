import { Request, Response } from "express";

export class HomeController {

    public index (req: Request, res: Response) {      
        res.status(200).send({
            message: "GET request successfull."
        })
    }
}